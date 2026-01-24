from typing import Dict, Any
from src.knowledge.retrieval_tool import lookup_strategy_rules
from src.integration.llm_client import query_llm

def analyze_strategy(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    The Strategist Node.
    Analyzes the market state and queries the knowledge base for rules.
    """
    market_data = state.get("market_data", {})
    iv = market_data.get("iv", 0)
    # Use the research data passed from the Market Researcher node
    news = state.get("research_data", "No recent market news found.")
    
    print("--- [Strategist] Querying RAG for Short Strangle & Straddle Rules ---")
    strangle_rules = lookup_strategy_rules.invoke("Short Strangle management")
    straddle_rules = lookup_strategy_rules.invoke("Short Straddle management")
    iron_fly_rules = lookup_strategy_rules.invoke("Iron Fly strategy rules") # Attempt to fetch if exists
    
    user_override = state.get("user_selected_strategy")
    recommended_sigma = 1.0  # Default sigma value
    
    if user_override:
         print(f"--- [Strategist] Manual Override Active: {user_override} ---")
         strategy = user_override
         rationale = f"User manually selected {user_override}."
         
         # Load constraints based on strategy
         if user_override == "Short Straddle":
             constraints = straddle_rules
         elif user_override == "Iron Fly":
             constraints = iron_fly_rules
         else:
             constraints = strangle_rules
             
         llm_response = f"Manual Override: {user_override}. Analysis skipped."
    else: 
        # Use LLM to decide Strategy (Existing Logic)
        system_prompt = (
            "You are an expert options strategist. "
            "Decide between 'Short Strangle' (Range Bound), 'Short Straddle' (Low Volatility), or 'Iron Fly' (Defined Risk). "
            "Also recommend the sigma multiplier for strike selection (1.0 for standard, 1.5 for conservative). "
            "Output JSON only: {'strategy': 'Short Strangle'/'Short Straddle'/'Iron Fly', 'recommended_sigma': float, 'rationale': '...', 'constraints': '...'}"
        )
        user_prompt = f"Market IV: {iv}%\nNews Sentiment: {news}\n\nStrangle Rules: {strangle_rules}\nStraddle Rules: {straddle_rules}\n\nRecommend the best strategy."
        
        llm_response = query_llm(system_prompt, user_prompt)
        
        # Enhanced parsing with robust JSON extraction
        if "Error" in llm_response:
            print("⚠️ [FALLBACK] LLM Error - Using default Strangle strategy")
            strategy = "Short Strangle"
            rationale = f"Defaulting to safer strategy due to LLM error. IV is {iv}%."
            constraints = strangle_rules
            recommended_sigma = 1.0
        else:
            # Try to parse JSON response
            import json
            import re
            
            strategy = None
            rationale = llm_response
            recommended_sigma = 1.0
            
            try:
                # Attempt to parse as JSON
                clean_response = re.sub(r'```json\s*|\s*```', '', llm_response)
                llm_json = json.loads(clean_response)
                
                strategy = llm_json.get('strategy')
                recommended_sigma = float(llm_json.get('recommended_sigma', 1.0))
                rationale = llm_json.get('rationale', llm_response)
                
                print(f"✅ Successfully parsed JSON: strategy={strategy}, sigma={recommended_sigma}")
                
            except (json.JSONDecodeError, ValueError) as e:
                # Fallback to regex extraction
                print(f"⚠️ JSON parsing failed, using regex fallback: {e}")
                
                strategy_map = {
                    r'\bshort\s+straddle\b': "Short Straddle",
                    r'\bshort\s+strangle\b': "Short Strangle",
                    r'\biron\s+fly\b': "Iron Fly",
                    r'\bstraddle\b': "Short Straddle",
                    r'\bstrangle\b': "Short Strangle"
                }
                
                for pattern, strat in strategy_map.items():
                    if re.search(pattern, llm_response, re.IGNORECASE):
                        strategy = strat
                        break
                
                sigma_match = re.search(r'sigma[:\s]*(\d+\.?\d*)', llm_response, re.IGNORECASE)
                if sigma_match:
                    try: recommended_sigma = float(sigma_match.group(1))
                    except: pass
            
            if not strategy:
                strategy = "Short Strangle"
            
            # Set constraints
            if strategy == "Short Straddle": constraints = straddle_rules
            elif strategy == "Iron Fly": constraints = iron_fly_rules
            else: constraints = strangle_rules

    strategy_decision = {
        "strategy": strategy,
        "rationale": rationale,
        "constraints": constraints,
        "market_sentiment": news,  # Correctly pass the news here
        "llm_analysis": llm_response,
        "recommended_sigma": recommended_sigma 
    }
    
    return {"strategy_decision": strategy_decision}
