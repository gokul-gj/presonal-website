from typing import Dict, Any
try:
    from duckduckgo_search import DDGS
except ImportError:
    pass

from src.integration.llm_client import query_llm

def perform_market_research(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    The Market Researcher Node.
    Uses DuckDuckGo Search to find current market sentiment/events.
    """
    print("--- [Market Researcher] Searching Web for Live Intel (DuckDuckGo v2) ---")
    
    raw_data = ""
    
    try:
        # 1. DuckDuckGo News Search
        query = "Nifty 50 live market sentiment news india"
        print(f"Searching DuckDuckGo for: {query}")
        
        search_results = []
        try:
            with DDGS() as ddgs:
                # Retrieve news results. Note: ddgs.text() or ddgs.news()
                # Using news() as verified in debug script.
                results = list(ddgs.news(query, max_results=5))
                search_results = results
        except Exception as e:
            print(f"DuckDuckGo Search failed: {e}")
            # Fallback message
            raw_data += "Note: Live web search failed. Relying on internal knowledge base for general market rules context.\n"

        # 2. Add Search Results to Context
        if search_results:
             raw_data += f"Top Search Headlines:\n"
             for r in search_results:
                 # Extract based on verified debug keys
                 title = r.get('title', 'No Title')
                 snippet = r.get('body', r.get('text', 'No Snippet'))
                 source = r.get('source', 'Unknown Source')
                 date = r.get('date', '')
                 
                 # Format for LLM
                 raw_data += f"- [{source} | {date}] {title}: {snippet}\n"
        
        if not raw_data:
             raw_data = "Could not fetch live data from Search."
             
    except Exception as e:
        print(f"Market Research Error: {e}")
        raw_data = f"Error performing market research: {str(e)}"

    print(f"Raw Research Data (first 200 chars): {raw_data[:200]}...")
    
    # 3. Summarize with LLM
    print("--- [Market Researcher] Synthesizing with LLM (Llama 3) ---")
    system_prompt = (
        "You are a senior financial market analyst for the Indian Stock Market (Nifty 50). "
        "Your job is to summarize the provided raw news headlines and search results into a concise market sentiment report. "
        "Focus on: Volatility (VIX), FII/DII activity, Global Cues, and Major Domestic Events. "
        "Conclude with a Sentiment Tag: 'Bullish', 'Bearish', 'Neutral', or 'Volatile'."
    )
    user_prompt = f"Raw Market Data:\n{raw_data}"
    
    try:
        # Use Llama 3 via Groq for fast synthesis
        research_summary = query_llm(system_prompt, user_prompt, provider="groq", model="llama-3.3-70b-versatile")
    except Exception as e:
        print(f"LLM Summarization Failed: {e}")
        research_summary = f"LLM Error. Raw Data: {raw_data}"
    
    print(f"LLM Summary: {research_summary}")
    
    return {"research_data": research_summary}
