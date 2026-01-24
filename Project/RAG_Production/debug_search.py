from duckduckgo_search import DDGS
import yfinance as yf

print("--- Testing DuckDuckGo ---")
try:
    with DDGS() as ddgs:
        results = list(ddgs.news("Nifty 50 India", max_results=3))
        print(f"DDGS Results: {len(results)}")
        for r in results:
            print(r)
except Exception as e:
    print(f"DDGS Failed: {e}")

print("\n--- Testing YFinance News ---")
try:
    nifty = yf.Ticker("^NSEI")
    news = nifty.news
    print(f"YF News Items: {len(news)}")
    for n in news[:3]:
        print(f"- {n.get('title')} ({n.get('publisher')})")
except Exception as e:
    print(f"YF News Failed: {e}")
