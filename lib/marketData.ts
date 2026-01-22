// Market Data Types
export interface IndexData {
    symbol: string;
    name: string;
    value: number;
    change: number;
    changePercent: number;
    high: number;
    low: number;
    open: number;
    prevClose: number;
    lastUpdated: string;
}

export interface StockMover {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
}

export interface OptionGreeks {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho?: number;
}

export interface OptionData {
    strikePrice: number;
    expiryDate: string;
    call: {
        premium: number;
        openInterest: number;
        volume: number;
        changeInOI: number;
        impliedVolatility: number;
        greeks: OptionGreeks;
    };
    put: {
        premium: number;
        openInterest: number;
        volume: number;
        changeInOI: number;
        impliedVolatility: number;
        greeks: OptionGreeks;
    };
}

export interface OptionsChainData {
    underlying: string;
    spotPrice: number;
    expiries: string[];
    atmStrike: number;
    options: OptionData[];
}

// Mock Data for Development/Fallback
export const mockIndicesData: IndexData[] = [
    {
        symbol: "NIFTY50",
        name: "NIFTY 50",
        value: 21731.40,
        change: 284.30,
        changePercent: 1.33,
        high: 21850.25,
        low: 21450.80,
        open: 21500.00,
        prevClose: 21447.10,
        lastUpdated: new Date().toISOString()
    },
    {
        symbol: "BANKNIFTY",
        name: "NIFTY BANK",
        value: 46125.85,
        change: -156.45,
        changePercent: -0.34,
        high: 46450.20,
        low: 45980.15,
        open: 46280.00,
        prevClose: 46282.30,
        lastUpdated: new Date().toISOString()
    },
    {
        symbol: "SENSEX",
        name: "BSE SENSEX",
        value: 71752.11,
        change: 445.29,
        changePercent: 0.62,
        high: 71950.75,
        low: 71320.45,
        open: 71500.00,
        prevClose: 71306.82,
        lastUpdated: new Date().toISOString()
    },
    {
        symbol: "NIFTYSMALLCAP100",
        name: "NIFTY SMALLCAP 100",
        value: 15234.60,
        change: 189.75,
        changePercent: 1.26,
        high: 15301.20,
        low: 15045.85,
        open: 15100.00,
        prevClose: 15044.85,
        lastUpdated: new Date().toISOString()
    },
    {
        symbol: "NIFTYMIDCAP100",
        name: "NIFTY MIDCAP 100",
        value: 48562.35,
        change: 512.80,
        changePercent: 1.07,
        high: 48750.90,
        low: 48050.25,
        open: 48150.00,
        prevClose: 48049.55,
        lastUpdated: new Date().toISOString()
    },
    {
        symbol: "INDIAVIX",
        name: "INDIA VIX",
        value: 13.42,
        change: -0.68,
        changePercent: -4.83,
        high: 14.25,
        low: 13.15,
        open: 14.10,
        prevClose: 14.10,
        lastUpdated: new Date().toISOString()
    }
];

export const mockTopGainers: StockMover[] = [
    { symbol: "ADANIPORTS", name: "Adani Ports", price: 1245.60, change: 87.30, changePercent: 7.54, volume: 8450000 },
    { symbol: "TATAMOTORS", name: "Tata Motors", price: 758.40, change: 45.20, changePercent: 6.34, volume: 12350000 },
    { symbol: "RELIANCE", name: "Reliance Ind.", price: 2486.75, change: 123.45, changePercent: 5.22, volume: 9870000 },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1623.90, change: 67.80, changePercent: 4.36, volume: 7650000 },
    { symbol: "INFY", name: "Infosys", price: 1534.25, change: 58.35, changePercent: 3.95, volume: 6234000 }
];

export const mockTopLosers: StockMover[] = [
    { symbol: "WIPRO", name: "Wipro", price: 432.15, change: -28.40, changePercent: -6.17, volume: 5430000 },
    { symbol: "TECHM", name: "Tech Mahindra", price: 1187.60, change: -65.30, changePercent: -5.21, volume: 4120000 },
    { symbol: "BAJFINANCE", name: "Bajaj Finance", price: 6842.30, change: -298.50, changePercent: -4.18, volume: 3890000 },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 1045.80, change: -38.70, changePercent: -3.57, volume: 8760000 },
    { symbol: "SBIN", name: "SBI", price: 612.45, change: -19.85, changePercent: -3.14, volume: 11230000 }
];

export const mockOptionsData: OptionsChainData = {
    underlying: "NIFTY",
    spotPrice: 21731.40,
    expiries: ["25-Jan-2024", "01-Feb-2024", "08-Feb-2024"],
    atmStrike: 21750,
    options: [
        {
            strikePrice: 21600,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 185.50,
                openInterest: 1245000,
                volume: 234500,
                changeInOI: 45000,
                impliedVolatility: 12.45,
                greeks: { delta: 0.68, gamma: 0.0012, theta: -15.4, vega: 8.2 }
            },
            put: {
                premium: 42.30,
                openInterest: 987000,
                volume: 156700,
                changeInOI: -12000,
                impliedVolatility: 13.12,
                greeks: { delta: -0.32, gamma: 0.0011, theta: -12.8, vega: 7.9 }
            }
        },
        {
            strikePrice: 21700,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 125.75,
                openInterest: 1567000,
                volume: 345600,
                changeInOI: 78000,
                impliedVolatility: 12.78,
                greeks: { delta: 0.55, gamma: 0.0014, theta: -16.2, vega: 9.1 }
            },
            put: {
                premium: 68.90,
                openInterest: 1234000,
                volume: 234500,
                changeInOI: 23000,
                impliedVolatility: 13.45,
                greeks: { delta: -0.45, gamma: 0.0013, theta: -14.5, vega: 8.8 }
            }
        },
        {
            strikePrice: 21750,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 95.40,
                openInterest: 2345000,
                volume: 567800,
                changeInOI: 123000,
                impliedVolatility: 13.05,
                greeks: { delta: 0.50, gamma: 0.0015, theta: -17.8, vega: 10.2 }
            },
            put: {
                premium: 94.85,
                openInterest: 2123000,
                volume: 456700,
                changeInOI: 89000,
                impliedVolatility: 13.25,
                greeks: { delta: -0.50, gamma: 0.0015, theta: -17.5, vega: 10.0 }
            }
        },
        {
            strikePrice: 21800,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 68.25,
                openInterest: 1876000,
                volume: 345600,
                changeInOI: 56000,
                impliedVolatility: 13.42,
                greeks: { delta: 0.42, gamma: 0.0014, theta: -16.3, vega: 9.5 }
            },
            put: {
                premium: 135.60,
                openInterest: 1654000,
                volume: 278900,
                changeInOI: 34000,
                impliedVolatility: 13.68,
                greeks: { delta: -0.58, gamma: 0.0013, theta: -15.9, vega: 9.3 }
            }
        },
        {
            strikePrice: 21900,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 38.75,
                openInterest: 1345000,
                volume: 189400,
                changeInOI: 23000,
                impliedVolatility: 13.95,
                greeks: { delta: 0.28, gamma: 0.0011, theta: -13.7, vega: 7.8 }
            },
            put: {
                premium: 198.40,
                openInterest: 1123000,
                volume: 156700,
                changeInOI: -8000,
                impliedVolatility: 14.25,
                greeks: { delta: -0.72, gamma: 0.0010, theta: -13.2, vega: 7.5 }
            }
        }
    ]
};

export const mockBankNiftyOptionsData: OptionsChainData = {
    underlying: "BANK NIFTY",
    spotPrice: 46125.85,
    expiries: ["25-Jan-2024", "01-Feb-2024", "08-Feb-2024"],
    atmStrike: 46100,
    options: [
        {
            strikePrice: 45900,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 412.30,
                openInterest: 987000,
                volume: 145600,
                changeInOI: 34000,
                impliedVolatility: 14.82,
                greeks: { delta: 0.72, gamma: 0.0009, theta: -18.5, vega: 12.4 }
            },
            put: {
                premium: 156.75,
                openInterest: 754000,
                volume: 98700,
                changeInOI: -8000,
                impliedVolatility: 15.31,
                greeks: { delta: -0.28, gamma: 0.0008, theta: -16.2, vega: 11.8 }
            }
        },
        {
            strikePrice: 46000,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 298.60,
                openInterest: 1234000,
                volume: 234500,
                changeInOI: 56000,
                impliedVolatility: 15.15,
                greeks: { delta: 0.61, gamma: 0.0011, theta: -19.8, vega: 13.6 }
            },
            put: {
                premium: 198.40,
                openInterest: 987000,
                volume: 167800,
                changeInOI: 12000,
                impliedVolatility: 15.64,
                greeks: { delta: -0.39, gamma: 0.0010, theta: -18.1, vega: 13.2 }
            }
        },
        {
            strikePrice: 46100,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 215.80,
                openInterest: 1876000,
                volume: 345600,
                changeInOI: 89000,
                impliedVolatility: 15.48,
                greeks: { delta: 0.50, gamma: 0.0012, theta: -21.3, vega: 14.8 }
            },
            put: {
                premium: 213.25,
                openInterest: 1654000,
                volume: 298700,
                changeInOI: 67000,
                impliedVolatility: 15.72,
                greeks: { delta: -0.50, gamma: 0.0012, theta: -21.0, vega: 14.5 }
            }
        },
        {
            strikePrice: 46200,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 156.90,
                openInterest: 1456000,
                volume: 256700,
                changeInOI: 45000,
                impliedVolatility: 15.89,
                greeks: { delta: 0.41, gamma: 0.0011, theta: -19.7, vega: 13.9 }
            },
            put: {
                premium: 284.50,
                openInterest: 1234000,
                volume: 189400,
                changeInOI: 23000,
                impliedVolatility: 16.15,
                greeks: { delta: -0.59, gamma: 0.0010, theta: -18.9, vega: 13.4 }
            }
        },
        {
            strikePrice: 46300,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 98.45,
                openInterest: 1123000,
                volume: 134500,
                changeInOI: 18000,
                impliedVolatility: 16.34,
                greeks: { delta: 0.29, gamma: 0.0009, theta: -17.2, vega: 12.1 }
            },
            put: {
                premium: 378.90,
                openInterest: 987000,
                volume: 123400,
                changeInOI: -6000,
                impliedVolatility: 16.68,
                greeks: { delta: -0.71, gamma: 0.0008, theta: -16.5, vega: 11.7 }
            }
        }
    ]
};

export const mockFinServicesOptionsData: OptionsChainData = {
    underlying: "NIFTY FIN SERVICES",
    spotPrice: 19845.30,
    expiries: ["25-Jan-2024", "01-Feb-2024", "08-Feb-2024"],
    atmStrike: 19850,
    options: [
        {
            strikePrice: 19700,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 234.60,
                openInterest: 756000,
                volume: 98700,
                changeInOI: 23000,
                impliedVolatility: 13.92,
                greeks: { delta: 0.70, gamma: 0.0010, theta: -16.8, vega: 9.8 }
            },
            put: {
                premium: 78.40,
                openInterest: 543000,
                volume: 67800,
                changeInOI: -5000,
                impliedVolatility: 14.28,
                greeks: { delta: -0.30, gamma: 0.0009, theta: -14.5, vega: 9.2 }
            }
        },
        {
            strikePrice: 19800,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 165.90,
                openInterest: 987000,
                volume: 145600,
                changeInOI: 34000,
                impliedVolatility: 14.18,
                greeks: { delta: 0.58, gamma: 0.0012, theta: -17.9, vega: 10.6 }
            },
            put: {
                premium: 112.30,
                openInterest: 765000,
                volume: 98700,
                changeInOI: 8000,
                impliedVolatility: 14.56,
                greeks: { delta: -0.42, gamma: 0.0011, theta: -16.3, vega: 10.1 }
            }
        },
        {
            strikePrice: 19850,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 126.75,
                openInterest: 1345000,
                volume: 234500,
                changeInOI: 56000,
                impliedVolatility: 14.45,
                greeks: { delta: 0.50, gamma: 0.0013, theta: -18.9, vega: 11.4 }
            },
            put: {
                premium: 125.80,
                openInterest: 1234000,
                volume: 198700,
                changeInOI: 45000,
                impliedVolatility: 14.62,
                greeks: { delta: -0.50, gamma: 0.0013, theta: -18.6, vega: 11.2 }
            }
        },
        {
            strikePrice: 19900,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 89.60,
                openInterest: 1123000,
                volume: 167800,
                changeInOI: 28000,
                impliedVolatility: 14.78,
                greeks: { delta: 0.39, gamma: 0.0012, theta: -17.4, vega: 10.5 }
            },
            put: {
                premium: 178.45,
                openInterest: 987000,
                volume: 134500,
                changeInOI: 15000,
                impliedVolatility: 15.04,
                greeks: { delta: -0.61, gamma: 0.0011, theta: -16.8, vega: 10.2 }
            }
        },
        {
            strikePrice: 20000,
            expiryDate: "25-Jan-2024",
            call: {
                premium: 54.25,
                openInterest: 876000,
                volume: 98700,
                changeInOI: 12000,
                impliedVolatility: 15.15,
                greeks: { delta: 0.26, gamma: 0.0010, theta: -15.2, vega: 9.1 }
            },
            put: {
                premium: 245.90,
                openInterest: 754000,
                volume: 89600,
                changeInOI: -4000,
                impliedVolatility: 15.48,
                greeks: { delta: -0.74, gamma: 0.0009, theta: -14.7, vega: 8.8 }
            }
        }
    ]
};

// Utility Functions
export function formatNumber(num: number, decimals: number = 2): string {
    return num.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

export function formatCurrency(num: number, decimals: number = 2): string {
    return `₹${formatNumber(num, decimals)}`;
}

export function formatPercentage(num: number, decimals: number = 2): string {
    const sign = num >= 0 ? '+' : '';
    return `${sign}${num.toFixed(decimals)}%`;
}

export function getChangeColor(change: number): string {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-white/60';
}

export function getChangeBgColor(change: number): string {
    if (change > 0) return 'from-green-500/20 to-emerald-500/20';
    if (change < 0) return 'from-red-500/20 to-rose-500/20';
    return 'from-gray-500/20 to-slate-500/20';
}
