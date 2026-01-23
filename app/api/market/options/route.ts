import { NextResponse } from 'next/server';
// @ts-ignore
import YahooFinance from 'yahoo-finance2';
import { calculateBlackScholes } from '@/lib/blackScholes';
import { OptionsChainData, OptionData } from '@/lib/marketData';

const yahooFinance = new YahooFinance();

export const dynamic = 'force-dynamic';
export const revalidate = 30; // 30 seconds

const INDICES = {
    NIFTY: { symbol: '^NSEI', name: 'NIFTY', step: 50 },
    BANKNIFTY: { symbol: '^NSEBANK', name: 'BANK NIFTY', step: 100 },
    // FINNIFTY proxy not perfect on Yahoo, usually calculated derived
    FINNIFTY: { symbol: 'NIFTY_FIN_SERVICE.NS', name: 'NIFTY FIN SERVICES', step: 50 }
};

// Next 3 Thursdays
function getNextExpiries() {
    const dates = [];
    const today = new Date();
    // Start looking from today
    let current = new Date(today);

    // Find next 3 Thursdays
    while (dates.length < 3) {
        // 4 is Thursday
        if (current.getDay() === 4) {
            // Format: DD-Mon-YYYY (e.g., 25-Jan-2024)
            const dateStr = current.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }).replace(/ /g, '-');
            dates.push(dateStr);
            current.setDate(current.getDate() + 7); // Jump to next week
        } else {
            current.setDate(current.getDate() + 1);
        }
    }
    return dates;
}

export async function GET() {
    try {
        // 1. Fetch Live Data for Underlying and VIX
        const [niftyQuote, bankNiftyQuote, vixQuote] = await Promise.all([
            yahooFinance.quote('^NSEI'),
            yahooFinance.quote('^NSEBANK'),
            yahooFinance.quote('^INDIAVIX')
        ]);

        const vix_iv = (vixQuote.regularMarketPrice || 13) / 100; // Decimal, e.g., 0.13
        const r = 0.07; // 7% Risk Free Rate (Approx for India)
        const expiries = getNextExpiries();

        // Helper to generate chain
        const generateChain = (quote: any, config: any): OptionsChainData => {
            const spotPrice = quote.regularMarketPrice;
            const step = config.step;
            const atmStrike = Math.round(spotPrice / step) * step;

            // Generate range: ATM - 8 to ATM + 8 steps
            const minStrike = atmStrike - (8 * step);
            const maxStrike = atmStrike + (8 * step);

            const options: OptionData[] = [];

            // Time to expiry (Yearly fraction)
            // Simulating "Next Thursday" expiry relative to today
            // For simplicity, let's say 4 days to expiry (Thursday)
            // In a real simulation, we'd parse the date.
            const daysToExpiry = 4;
            const T = daysToExpiry / 365;

            for (let k = minStrike; k <= maxStrike; k += step) {
                // Calculate Call
                const callBS = calculateBlackScholes(spotPrice, k, T, r, vix_iv, "CALL");
                // Calculate Put
                const putBS = calculateBlackScholes(spotPrice, k, T, r, vix_iv, "PUT");

                options.push({
                    strikePrice: k,
                    expiryDate: expiries[0],
                    call: {
                        premium: callBS.price,
                        greeks: callBS.greeks,
                        // Simulated OI/Vol based on "distance from ATM"
                        openInterest: Math.floor(2000000 * Math.exp(-Math.abs(k - spotPrice) / (step * 3))),
                        volume: Math.floor(500000 * Math.exp(-Math.abs(k - spotPrice) / (step * 3))),
                        changeInOI: Math.floor((Math.random() - 0.5) * 50000),
                        impliedVolatility: vix_iv * 100
                    },
                    put: {
                        premium: putBS.price,
                        greeks: putBS.greeks,
                        openInterest: Math.floor(1800000 * Math.exp(-Math.abs(k - spotPrice) / (step * 3))),
                        volume: Math.floor(450000 * Math.exp(-Math.abs(k - spotPrice) / (step * 3))),
                        changeInOI: Math.floor((Math.random() - 0.5) * 50000),
                        impliedVolatility: vix_iv * 100
                    }
                });
            }

            return {
                underlying: config.name,
                spotPrice: spotPrice,
                expiries: expiries,
                atmStrike: atmStrike,
                options: options
            };
        };

        const responseData = [
            generateChain(niftyQuote, INDICES.NIFTY),
            generateChain(bankNiftyQuote, INDICES.BANKNIFTY),
            // Reuse Nifty for FinService proxy as we don't have good live data for it easily without calculation
            // Or just mock it slightly differently
        ];

        return NextResponse.json({
            success: true,
            data: responseData,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Error generating options:", error);
        return NextResponse.json({ success: false, error: "Failed to generate options" }, { status: 500 });
    }
}
