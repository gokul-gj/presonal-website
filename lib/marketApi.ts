"use client";

import { useState, useEffect, useCallback } from 'react';
import type { IndexData, StockMover, OptionsChainData } from './marketData';

export interface MarketDataResponse {
    success: boolean;
    data: IndexData[];
    source: 'live' | 'mock' | 'mixed';
    timestamp: string;
    error?: string;
}

// Hook for auto-refreshing market data
export function useMarketData(refreshInterval: number = 3600000) { // Default 1 hour
    const [data, setData] = useState<IndexData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [source, setSource] = useState<'live' | 'mock' | 'mixed'>('mock');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/market/indices');

            if (!response.ok) {
                throw new Error('Failed to fetch market data');
            }

            const result: MarketDataResponse = await response.json();

            if (result.success) {
                setData(result.data);
                setSource(result.source);
                setLastUpdated(new Date(result.timestamp));
                setError(result.error || null);
            } else {
                throw new Error('API returned unsuccessful response');
            }
        } catch (err) {
            console.error('Error fetching market data:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Fetch immediately on mount
        fetchData();

        // Set up interval for auto-refresh
        const interval = setInterval(() => {
            console.log('Auto-refreshing market data...');
            fetchData();
        }, refreshInterval);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, [fetchData, refreshInterval]);

    return {
        data,
        loading,
        error,
        lastUpdated,
        source,
        refetch: fetchData
    };
}

// Manual fetch function for one-time calls
export async function fetchIndicesData(): Promise<IndexData[]> {
    try {
        const response = await fetch('/api/market/indices');
        const result: MarketDataResponse = await response.json();

        if (result.success) {
            return result.data;
        }

        throw new Error('Failed to fetch indices data');
    } catch (error) {
        console.error('Error fetching indices:', error);
        throw error;
    }
}

export interface MoversData {
    gainers: StockMover[];
    losers: StockMover[];
}

export interface MoversResponse {
    success: boolean;
    data: MoversData;
    source: 'live' | 'mock';
    timestamp: string;
    error?: string;
}

export function useTopMovers(refreshInterval: number = 60000) {
    const [data, setData] = useState<MoversData | null>(null);
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState<'live' | 'mock'>('mock');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/market/movers');
            const result: MoversResponse = await response.json();

            if (result.success) {
                setData(result.data);
                setSource(result.source);
            }
        } catch (err) {
            console.error('Error fetching movers:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, refreshInterval);
        return () => clearInterval(interval);
    }, [fetchData, refreshInterval]);

    return { data, loading, source, refetch: fetchData };
}
