
/**
 * Black-Scholes Option Pricing Model and Greeks Calculator
 */

// Cumulative Distribution Function (CDF) for Standard Normal Distribution
function cdf(x: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989422804014337 * Math.exp(-x * x / 2);
    const prob = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return x > 0 ? 1 - prob : prob;
}

// Probability Density Function (PDF) for Standard Normal Distribution
function pdf(x: number): number {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(x * x) / 2);
}

interface OptionGreeks {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
}

interface OptionPriceAndGreeks {
    price: number;
    greeks: OptionGreeks;
}

/**
 * Calculates theoretical price and Greeks for a European option.
 * 
 * @param S Current stock (or index) price
 * @param K Strike price
 * @param T Time to expiry in years
 * @param r Risk-free interest rate (decimal, e.g., 0.05 for 5%)
 * @param sigma Volatility (decimal, e.g., 0.20 for 20%)
 * @param type "CALL" or "PUT"
 */
export function calculateBlackScholes(
    S: number,
    K: number,
    T: number,
    r: number,
    sigma: number,
    type: "CALL" | "PUT"
): OptionPriceAndGreeks {
    // Avoid division by zero
    if (T <= 0 || sigma <= 0) {
        return {
            price: type === "CALL" ? Math.max(0, S - K) : Math.max(0, K - S),
            greeks: { delta: 0, gamma: 0, theta: 0, vega: 0, rho: 0 }
        };
    }

    const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    let price = 0;
    let delta = 0;
    let gamma = 0;
    let theta = 0;
    let vega = 0;
    let rho = 0;

    const e_rt = Math.exp(-r * T);

    if (type === "CALL") {
        price = S * cdf(d1) - K * e_rt * cdf(d2);
        delta = cdf(d1);
        rho = K * T * e_rt * cdf(d2);
        theta = (- (S * pdf(d1) * sigma) / (2 * Math.sqrt(T)) - r * K * e_rt * cdf(d2)) / 365; // Daily Theta
    } else {
        price = K * e_rt * cdf(-d2) - S * cdf(-d1);
        delta = cdf(d1) - 1;
        rho = -K * T * e_rt * cdf(-d2);
        theta = (- (S * pdf(d1) * sigma) / (2 * Math.sqrt(T)) + r * K * e_rt * cdf(-d2)) / 365; // Daily Theta
    }

    // Gamma and Vega are the same for Calls and Puts
    gamma = pdf(d1) / (S * sigma * Math.sqrt(T));
    vega = (S * pdf(d1) * Math.sqrt(T)) / 100; // Scaled for 1% change in vol

    return {
        price,
        greeks: {
            delta,
            gamma,
            theta,
            vega,
            rho
        }
    };
}
