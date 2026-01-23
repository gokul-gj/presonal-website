import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';
import type { StockMover } from '@/lib/marketData';
import { mockTopGainers, mockTopLosers } from '@/lib/marketData';

const yahooFinance = new YahooFinance();

// NIFTY 50 Symbols (Yahoo Finance format with .NS suffix)
const NIFTY50_SYMBOLS = [
    'ADANIENT.NS', 'ADANIPORTS.NS', 'APOLLOHOSP.NS', 'ASIANPAINT.NS', 'AXISBANK.NS',
    'BAJAJ-AUTO.NS', 'BAJFINANCE.NS', 'BAJAJFINSV.NS', 'BPCL.NS', 'BHARTIARTL.NS',
    'BRITANNIA.NS', 'CIPLA.NS', 'COALINDIA.NS', 'DIVISLAB.NS', 'DRREDDY.NS',
    'EICHORMOT.NS', 'GRASIM.NS', 'HCLTECH.NS', 'HDFCBANK.NS', 'HDFCLIFE.NS',
    'HEROMOTOCO.NS', 'HINDALCO.NS', 'HINDUNILVR.NS', 'ICICIBANK.NS', 'ITC.NS',
    'INDUSINDBK.NS', 'INFY.NS', 'JSWSTEEL.NS', 'KOTAKBANK.NS', 'LTIM.NS',
    'LT.NS', 'M&M.NS', 'MARUTI.NS', 'NTPC.NS', 'NESTLEIND.NS',
    'ONGC.NS', 'POWERGRID.NS', 'RELIANCE.NS', 'SBILIFE.NS', 'SBIN.NS',
    'SUNPHARMA.NS', 'TCS.NS', 'TATACONSUM.NS', 'TATAMOTORS.NS', 'TATASTEEL.NS',
    'TECHM.NS', 'TITAN.NS', 'ULTRACEMCO.NS', 'WIPRO.NS', 'SHRIRAMFIN.NS' // Replaced UPL
];

export async function GET() {
    try {
        // Fetch specific fields to optimize payload if possible, though 'quote' returns a fixed set usually
        const quotes = await yahooFinance.quote(NIFTY50_SYMBOLS);

        if (!quotes || quotes.length === 0) {
            throw new Error('No data returned from Yahoo Finance');
        }

        const movers: StockMover[] = quotes.map((q: any) => ({
            symbol: q.symbol.replace('.NS', ''), // Remove .NS for display
            name: q.shortName || q.longName || q.symbol,
            price: q.regularMarketPrice || 0,
            change: q.regularMarketChange || 0,
            changePercent: q.regularMarketChangePercent || 0,
            volume: q.regularMarketVolume || 0
        }));

        // Sort by change percent descending
        const sortedMovers = [...movers].sort((a, b) => b.changePercent - a.changePercent);

        const gainers = sortedMovers.slice(0, 5);
        const losers = sortedMovers.reverse().slice(0, 5);

        return NextResponse.json({
            success: true,
            data: {
                gainers,
                losers
            },
            source: 'live',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error fetching movers:', error);
        return NextResponse.json({
            success: true,
            data: {
                gainers: mockTopGainers,
                losers: mockTopLosers
            },
            source: 'mock',
            error: 'Failed to fetch live movers',
            timestamp: new Date().toISOString()
        });
    }
}

// Revalidate every minute
export const revalidate = 60;
