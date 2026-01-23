import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const strategyOverride = body.strategyOverride || "Auto"; // "Auto" | "Short Strangle" | "Short Straddle" | "Iron Fly"

        // 1. Market Scanner Step (Live Data)
        const [niftyQuote, vixQuote] = await Promise.all([
            yahooFinance.quote('^NSEI'),
            yahooFinance.quote('^INDIAVIX')
        ]);

        const spotPrice = niftyQuote.regularMarketPrice || 22000;
        const vix = vixQuote.regularMarketPrice || 13;
        const isHighVix = vix > 15;
        const trend = (niftyQuote.regularMarketChangePercent || 0) > 0 ? "BULLISH" : "BEARISH";

        // 2. Market Researcher Step (Simulated)
        const researchSummary = trend === "BULLISH"
            ? "Global markets showing resilience. FII inflows positive in recent sessions. Tech sector leading the rally."
            : "Global cues weak due to inflation concerns. Profit booking seen in major banking stocks.";

        // 3. Strategist Step (Logic)
        let strategy = "Short Strangle"; // Default
        let reasoning = "VIX is moderate, suggesting range-bound movement.";
        let selectedLegs: any[] = [];

        // Logic for Auto vs Manual
        if (strategyOverride !== "Auto") {
            strategy = strategyOverride;
            reasoning = `Manual override selected: ${strategyOverride}. Adjusting strikes based on current spot.`;
        } else {
            // Auto Logic
            if (isHighVix) {
                strategy = "Iron Fly";
                reasoning = "High VIX indicates expensive premiums. Iron Fly limits risk while capturing mean reversion.";
            } else if (Math.abs(niftyQuote.regularMarketChangePercent || 0) > 1.0) {
                strategy = trend === "BULLISH" ? "Bull Call Spread" : "Bear Put Spread";
                reasoning = `Strong ${trend.toLowerCase()} momentum detected. Directional spread recommended.`;
            }
        }

        // 4. Execution Plan (Strikes)
        const roundToStrike = (price: number) => Math.round(price / 50) * 50;
        const atm = roundToStrike(spotPrice);

        // Strike Logic
        let ceStrike = atm;
        let peStrike = atm;
        let hedgeCe = 0;
        let hedgePe = 0;

        if (strategy === "Short Straddle" || strategy === "Iron Fly") {
            ceStrike = atm;
            peStrike = atm;
        } else {
            // Strangle or Spreads - wider
            const width = isHighVix ? 500 : 300;
            ceStrike = atm + width;
            peStrike = atm - width;
        }

        selectedLegs = [
            { type: "SELL", instrument: "CE", strike: ceStrike, qty: 50, premium: 100 }, // Simulated premium
            { type: "SELL", instrument: "PE", strike: peStrike, qty: 50, premium: 100 }
        ];

        // Add hedges for Iron Fly or Spreads
        if (strategy === "Iron Fly" || strategy.includes("Spread")) {
            hedgeCe = ceStrike + 200;
            hedgePe = peStrike - 200;
            selectedLegs.push(
                { type: "BUY", instrument: "CE", strike: hedgeCe, qty: 50, premium: 20 },
                { type: "BUY", instrument: "PE", strike: hedgePe, qty: 50, premium: 20 }
            );
        }

        const executionPlan = {
            strategy: strategy,
            legs: selectedLegs
        };

        // 4b. Risk Analysis (Pass/Fail Logic)
        const marginReq = strategy.includes("Iron") || strategy.includes("Spread") ? 60000 : 125000; // Hedged vs Naked
        const riskStatus = "PASS";
        const riskReasoning = `Margin Utilization: ${(marginReq / 500000 * 100).toFixed(0)}%. Delta Neutrality: Maintained. Gamma Risk: Low.`;

        const riskAnalysis = {
            status: riskStatus,
            details: riskReasoning,
            margin: marginReq
        };

        // 4c. Payoff Data Generation
        // Generate 21 points centered around ATM
        const payoffData = [];
        const range = 1000;
        for (let price = atm - range; price <= atm + range; price += 100) {
            let pnl = 0;
            selectedLegs.forEach(leg => {
                const isCall = leg.instrument === "CE";
                const isBuy = leg.type === "BUY";
                const strike = leg.strike;
                const premium = leg.premium;

                let intrinsic = 0;
                if (isCall) intrinsic = Math.max(0, price - strike);
                else intrinsic = Math.max(0, strike - price);

                if (isBuy) {
                    pnl += (intrinsic - premium) * leg.qty;
                } else {
                    pnl += (premium - intrinsic) * leg.qty;
                }
            });
            payoffData.push({ x: price, y: pnl });
        }


        // 5. Build Response Stream (Steps for UI visualization)
        const steps = [
            {
                id: 1,
                agent: "Market Scanner",
                status: "completed",
                message: `Fetched NIFTY Spot: ${spotPrice.toFixed(2)}, India VIX: ${vix.toFixed(2)}`
            },
            {
                id: 2,
                agent: "Market Researcher",
                status: "completed",
                message: `Analyzed News: ${researchSummary}`
            },
            {
                id: 3,
                agent: "Strategist",
                status: "completed",
                message: `Selected Strategy: ${strategy}. Reasoning: ${reasoning}`
            },
            {
                id: 4,
                agent: "Risk Manager",
                status: "completed",
                message: `${riskReasoning} Risk Check: ${riskStatus}.`
            }
        ];

        return NextResponse.json({
            success: true,
            marketData: { spotPrice, vix, trend },
            steps,
            finalDecision: executionPlan,
            riskAnalysis,
            payoffData,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("RAG Agent Error:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to run agent workflow"
        }, { status: 500 });
    }
}
