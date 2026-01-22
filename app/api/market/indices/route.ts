import { NextResponse } from 'next/server';
import type { IndexData } from '@/lib/marketData';
import { mockIndicesData } from '@/lib/marketData';

// Yahoo Finance API symbols for Indian indices
const SYMBOLS = {
    NIFTY50: '^NSEI',
    BANKNIFTY: '^NSEBANK',
    SENSEX: '^BSESN',
    // Note: Yahoo Finance doesn't have direct symbols for Smallcap, Midcap, VIX
    // We'll use mock data for these or need alternative sources
};

async function fetchYahooFinanceData(symbol: string): Promise<any> {
    try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            throw new Error(`Yahoo Finance API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        return null;
    }
}

function transformYahooData(symbol: string, data: any): IndexData | null {
    try {
        const quote = data?.chart?.result?.[0];
        if (!quote) return null;

        const meta = quote.meta;
        const indicators = quote.indicators?.quote?.[0];

        const currentPrice = meta.regularMarketPrice || 0;
        const previousClose = meta.previousClose || meta.chartPreviousClose || 0;
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;

        // Get OHLC from indicators
        const open = indicators?.open?.[0] || meta.regularMarketPrice || 0;
        const high = meta.regularMarketDayHigh || 0;
        const low = meta.regularMarketDayLow || 0;

        // Map symbol to our format
        const symbolMap: { [key: string]: { symbol: string; name: string } } = {
            [SYMBOLS.NIFTY50]: { symbol: 'NIFTY50', name: 'NIFTY 50' },
            [SYMBOLS.BANKNIFTY]: { symbol: 'BANKNIFTY', name: 'NIFTY BANK' },
            [SYMBOLS.SENSEX]: { symbol: 'SENSEX', name: 'BSE SENSEX' }
        };

        const mappedSymbol = symbolMap[symbol] || { symbol: symbol, name: symbol };

        return {
            symbol: mappedSymbol.symbol,
            name: mappedSymbol.name,
            value: currentPrice,
            change: change,
            changePercent: changePercent,
            high: high,
            low: low,
            open: open,
            prevClose: previousClose,
            lastUpdated: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error transforming Yahoo data:', error);
        return null;
    }
}

export async function GET() {
    try {
        // Fetch data for main indices
        const [niftyData, bankNiftyData, sensexData] = await Promise.all([
            fetchYahooFinanceData(SYMBOLS.NIFTY50),
            fetchYahooFinanceData(SYMBOLS.BANKNIFTY),
            fetchYahooFinanceData(SYMBOLS.SENSEX)
        ]);

        // Transform the data
        const indices: IndexData[] = [];

        if (niftyData) {
            const transformed = transformYahooData(SYMBOLS.NIFTY50, niftyData);
            if (transformed) indices.push(transformed);
        }

        if (bankNiftyData) {
            const transformed = transformYahooData(SYMBOLS.BANKNIFTY, bankNiftyData);
            if (transformed) indices.push(transformed);
        }

        if (sensexData) {
            const transformed = transformYahooData(SYMBOLS.SENSEX, sensexData);
            if (transformed) indices.push(transformed);
        }

        // Add mock data for indices not available in Yahoo Finance
        // (Smallcap, Midcap, VIX)
        const mockOnlyIndices = mockIndicesData.filter(idx =>
            ['NIFTYSMALLCAP100', 'NIFTYMIDCAP100', 'INDIAVIX'].includes(idx.symbol)
        );
        indices.push(...mockOnlyIndices);

        // If we got no real data, fallback to all mock data
        if (indices.length === 0) {
            console.warn('No real data fetched, using mock data');
            return NextResponse.json({
                success: true,
                data: mockIndicesData,
                source: 'mock',
                timestamp: new Date().toISOString()
            });
        }

        return NextResponse.json({
            success: true,
            data: indices,
            source: indices.length > 3 ? 'mixed' : 'live',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in indices API:', error);

        // Return mock data on error
        return NextResponse.json({
            success: true,
            data: mockIndicesData,
            source: 'mock',
            error: 'Failed to fetch live data, using fallback',
            timestamp: new Date().toISOString()
        });
    }
}

// Enable caching
export const revalidate = 3600; // Revalidate every hour
