import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const strategyOverride = body.strategyOverride || null;

        console.log('🚀 [RAG API] Starting Python backend execution...');

        // Path to your Python project (inside website folder)
        const pythonProjectPath = path.join(process.cwd(), 'Project', 'RAG_Production');

        // Use the Python executable from the virtual environment
        const pythonCmd = path.join(pythonProjectPath, '.venv', 'bin', 'python');

        console.log(`📂 Project path: ${pythonProjectPath}`);
        console.log(`🐍 Python: ${pythonCmd}`);

        // Call the Python main_graph.py script
        const pythonProcess = spawn(pythonCmd, [
            'main_graph.py'
        ], {
            cwd: pythonProjectPath,
            env: {
                ...process.env,
                USER_SELECTED_STRATEGY: strategyOverride || ''
            }
        });

        let pythonOutput = '';
        let pythonError = '';

        // Collect stdout
        pythonProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log('[Python]:', output);
            pythonOutput += output;
        });

        // Collect stderr
        pythonProcess.stderr.on('data', (data) => {
            const error = data.toString();
            console.error('[Python Error]:', error);
            pythonError += error;
        });

        // Wait for process to complete
        const result: any = await new Promise((resolve, reject) => {
            pythonProcess.on('close', (code) => {
                console.log(`Python process exited with code ${code}`);

                if (code === 0) {
                    try {
                        // Extract JSON from output (look for __JSON_START__)
                        const startMarker = '__JSON_START__';
                        const endMarker = '__JSON_END__';

                        const startIndex = pythonOutput.indexOf(startMarker);
                        const endIndex = pythonOutput.indexOf(endMarker);

                        if (startIndex !== -1 && endIndex !== -1) {
                            const jsonText = pythonOutput.substring(startIndex + startMarker.length, endIndex);
                            const data = JSON.parse(jsonText);
                            resolve(data);
                        } else {
                            console.log('Full Python output:', pythonOutput);
                            reject(new Error('No JSON delimiters found in Python output'));
                        }
                    } catch (e: any) {
                        console.error('JSON parse error:', e.message);
                        console.log('Output extraction failed. Raw:', pythonOutput.substring(0, 500));
                        reject(e);
                    }
                } else {
                    reject(new Error(`Python exited with code ${code}. Error: ${pythonError}`));
                }
            });

            pythonProcess.on('error', (err: any) => {
                console.error('Failed to start Python:', err);
                reject(err);
            });

            // Set timeout (60 seconds)
            setTimeout(() => {
                pythonProcess.kill();
                reject(new Error('Python execution timeout after 60s'));
            }, 60000);
        });

        // Transform Python output to UI format
        const marketData = result.market_data || {};
        const strategyDecision = result.strategy_decision || {};
        const finalOrder = result.final_order || {};
        const riskStatus = result.risk_status || 'unknown';
        const riskAnalysis = result.risk_analysis || '';

        // Build steps for UI
        const steps = [
            {
                id: 1,
                agent: "Market Scanner",
                status: "completed",
                message: `Fetched NIFTY Spot: ${marketData.spot_price?.toFixed(2) || 'N/A'}, India VIX: ${marketData.iv?.toFixed(2) || 'N/A'}%`
            },
            {
                id: 2,
                agent: "Market Researcher (Llama 3)",
                status: "completed",
                message: `${strategyDecision.market_sentiment || 'N/A'}`
            },
            {
                id: 3,
                agent: "Strategist (GPT-4 + RAG)",
                status: "completed",
                message: `Strategy: ${strategyDecision.strategy || 'N/A'}. Sigma: ${strategyDecision.recommended_sigma || 1.0}. ${strategyDecision.rationale || ''}`
            },
            {
                id: 4,
                agent: "Risk Manager (Llama 3)",
                status: "completed",
                message: `Risk: ${riskStatus}. ${riskAnalysis}`
            }
        ];

        // Generate payoff data
        const payoffData = generatePayoffData(finalOrder, marketData.spot_price || 22000);

        return NextResponse.json({
            success: true,
            marketData: {
                spotPrice: marketData.spot_price,
                vix: marketData.iv,
                trend: marketData.spot_price > 22000 ? 'BULLISH' : 'BEARISH'
            },
            steps,
            finalDecision: {
                strategy: finalOrder.strategy,
                legs: finalOrder.legs || []
            },
            riskAnalysis: {
                status: riskStatus,
                details: riskAnalysis,
                margin: 125000
            },
            payoffData,
            llmAnalysis: strategyDecision.llm_analysis,
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        console.error("❌ [RAG API] Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to run agent workflow"
        }, { status: 500 });
    }
}

// Helper: Generate payoff data
function generatePayoffData(order: any, spotPrice: number) {
    const legs = order?.legs || [];
    const atm = Math.round(spotPrice / 50) * 50;
    const payoffData = [];
    const range = 1000;

    for (let price = atm - range; price <= atm + range; price += 100) {
        let pnl = 0;

        legs.forEach((leg: any) => {
            const isCall = leg.type === "CE";
            const strike = leg.strike;
            const qty = leg.quantity || 50;
            const premium = 100;

            let intrinsic = 0;
            if (isCall) intrinsic = Math.max(0, price - strike);
            else intrinsic = Math.max(0, strike - price);

            if (leg.action === "SELL") {
                pnl += (premium - intrinsic) * qty;
            }
        });

        payoffData.push({ x: price, y: pnl });
    }

    return payoffData;
}
