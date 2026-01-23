import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();
import type { IndexData } from '@/lib/marketData';
import { mockIndicesData } from '@/lib/marketData';

// Yahoo Finance API symbols for Indian indices
const SYMBOLS = {
    NIFTY50: '^NSEI',
    BANKNIFTY: '^NSEBANK',
    SENSEX: '^BSESN',
    INDIAVIX: '^INDIAVIX',
    NIFTYMIDCAP100: '^NSEMDCP100', // Added Midcap
    NIFTYSMALLCAP100: '^NSESCAP', // Added Smallcap (Check symbol if needed, usually ^CNXSC on some platforms or NIFTY_SMALLCAP_100.NS)
    // Yahoo finance often uses .NS suffix for stocks, but indices usually start with ^
};

// Map Yahoo symbols to our internal IDs/Names
const SYMBOL_MAP: Record<string, { id: string; name: string }> = {
    [SYMBOLS.NIFTY50]: { id: 'NIFTY50', name: 'NIFTY 50' },
    [SYMBOLS.BANKNIFTY]: { id: 'BANKNIFTY', name: 'NIFTY BANK' }, // Updated name to match typical display
    [SYMBOLS.SENSEX]: { id: 'SENSEX', name: 'BSE SENSEX' },
    [SYMBOLS.INDIAVIX]: { id: 'INDIAVIX', name: 'INDIA VIX' },
    [SYMBOLS.NIFTYMIDCAP100]: { id: 'NIFTYMIDCAP100', name: 'NIFTY MIDCAP 100' },
    // Smallcap symbol on Yahoo might be tricky, limiting to reliable ones for now or adding if verified.
};

async function fetchLiveIndices() {
    const symbolsToFetch = [
        SYMBOLS.NIFTY50,
        SYMBOLS.BANKNIFTY,
        SYMBOLS.SENSEX,
        SYMBOLS.INDIAVIX
    ];

    try {
        const results = await Promise.all(
            symbolsToFetch.map(async (symbol) => {
                try {
                    const quote = await yahooFinance.quote(symbol);
                    return { symbol, quote };
                } catch (e) {
                    console.error(`Failed to fetch ${symbol}:`, e);
                    return { symbol, error: e };
                }
            })
        );

        const indices: IndexData[] = [];

        results.forEach(({ symbol, quote, error }) => {
            if (quote && !error) {
                const info = SYMBOL_MAP[symbol];
                if (!info) return;

                // Type assertion/casting to handle potential strict type issues from the library or missing types
                const q = quote as any;

                indices.push({
                    symbol: info.id, // Using our internal ID
                    name: info.name,
                    value: q.regularMarketPrice || 0,
                    change: q.regularMarketChange || 0,
                    changePercent: q.regularMarketChangePercent || 0,
                    high: q.regularMarketDayHigh || 0,
                    low: q.regularMarketDayLow || 0,
                    open: q.regularMarketOpen || 0,
                    prevClose: q.regularMarketPreviousClose || 0,
                    lastUpdated: new Date().toISOString()
                });
            }
        });

        return indices;

    } catch (error) {
        console.error('Error fetching batch indices:', error);
        return [];
    }
}

export async function GET() {
    try {
        const liveIndices = await fetchLiveIndices();

        if (liveIndices.length === 0) {
            console.warn('No live data fetched, falling back to mock.');
            return NextResponse.json({
                success: true,
                data: mockIndicesData,
                source: 'mock',
                timestamp: new Date().toISOString()
            });
        }

        // Merge with mock data if needed for indices we couldn't fetch but exist in mock (e.g. specialized ones)
        // For now, let's just return what we have.

        return NextResponse.json({
            success: true,
            data: liveIndices,
            source: 'live',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in indices API:', error);
        return NextResponse.json({
            success: true,
            data: mockIndicesData,
            source: 'mock',
            error: 'Failed to fetch live data',
            timestamp: new Date().toISOString()
        });
    }
}

// Revalidate frequently for market data
export const revalidate = 60; // 60 seconds
