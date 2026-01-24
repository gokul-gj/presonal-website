from typing import Dict, Any
from src.integration.kite_app import kite_client
from src.quant_engine.sigma_calculator import get_strangle_strikes, get_atm_strike
from src.quant_engine.option_chain_builder import get_lot_size

def execute_order(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    The Executor Node.
    Takes the strategy decision and market data to generate final orders.
    """
    print("--- [Executor] Calculating Strikes ---")
    market_data = state.get("market_data", {})
    strategy_dec = state.get("strategy_decision", {})
    strategy_name = strategy_dec.get("strategy", "Short Strangle")
    
    if not market_data:
        return {"error": "No market data found"}
        
    spot = market_data.get("spot_price")
    iv = market_data.get("iv")
    days = market_data.get("days_to_expiry")
    symbol = market_data.get("symbol", "NIFTY")
    option_chain = market_data.get("option_chain")
    
    # Get sigma multiplier from strategy decision (LLM recommendation)
    sigma_mult = strategy_dec.get("recommended_sigma", 1.0)
    
    strikes = {}
    
    if strategy_name == "Short Straddle":
        atm = get_atm_strike(spot)
        strikes = {
            "sell_call_strike": atm,
            "sell_put_strike": atm,
            "type": "Straddle"
        }
    elif strategy_name == "Iron Fly":
        atm = get_atm_strike(spot)
        # Dynamic wing width: ~1-1.5% of spot or fixed. For Nifty (~25000), 200-300 pts is standard.
        # Using a simple fixed width for robustness in demo, can be made dynamic later.
        wing_width = 300 
        strikes = {
            "sell_call_strike": atm,
            "sell_put_strike": atm,
            "buy_call_strike": atm + wing_width,
            "buy_put_strike": atm - wing_width,
            "type": "Iron Fly"
        }
    else:
        # Default Strangle
        strikes = get_strangle_strikes(spot, iv, days, sigma_mult)
    
    # Place Orders via Kite
    # Prepare list of legs to process
    legs_to_process = []
    
    # Sell Legs (Always present)
    legs_to_process.append({"side": "CE", "strike": strikes["sell_call_strike"], "action": "SELL"})
    legs_to_process.append({"side": "PE", "strike": strikes["sell_put_strike"], "action": "SELL"})
    
    # Buy Legs (Only for Iron Fly)
    if strategy_name == "Iron Fly":
        legs_to_process.append({"side": "CE", "strike": strikes["buy_call_strike"], "action": "BUY"})
        legs_to_process.append({"side": "PE", "strike": strikes["buy_put_strike"], "action": "BUY"})

    final_legs = []
    
    # Get real option symbols directly from option chain
    try:
        if option_chain is not None and not option_chain.empty:
            available_strikes = option_chain['strike'].tolist()
            
            for leg in legs_to_process:
                target_strike = leg["strike"]
                # Find closest available strike
                actual_strike = min(available_strikes, key=lambda x: abs(x - target_strike))
                
                # Get symbol
                row = option_chain[option_chain['strike'] == actual_strike]
                col_name = f"tradingsymbol_{leg['side'].lower()}"
                
                if not row.empty and row[col_name].iloc[0]:
                    symbol_code = row[col_name].iloc[0]
                    # Add to final list
                    lot_size = get_lot_size(symbol)
                    final_legs.append({
                        "type": leg["side"],
                        "strike": actual_strike,
                        "instrument": symbol_code,
                        "quantity": lot_size,
                        "action": leg["action"],
                        "order_id": None
                    })
                    print(f"✅ Found option: {symbol_code} ({leg['action']})")
                else:
                    print(f"⚠️ Warning: Symbol not found for {leg['side']} {actual_strike}")
            
        else:
            raise Exception("Option chain data not available")
    except Exception as e:
        print(f"Error getting option symbols: {e}")
        raise Exception(f"Cannot execute order without valid option chain data: {e}")
    
    print(f"--- [Executor] Generated Trade Plan: {strategy_name} with {len(final_legs)} legs ---")
    
    order = {
        "action": "COMBINATION",
        "strategy": strategy_name,
        "legs": final_legs,
        "analysis": strikes
    }
    
    return {"final_order": order}
