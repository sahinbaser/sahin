import pandas as pd
import yfinance as yf

class MoneyFlowService:
    @staticmethod
    def get_sector_flows():
        """
        Analyzes major ETFs or representative tickers for different sectors
        to determine where the money is flowing.
        """
        sectors = {
            "Technology (US)": "XLK",
            "Financials (US)": "XLF",
            "Healthcare (US)": "XLV",
            "Energy (US)": "XLE",
            "Consumer Staples (US)": "XLP",
            "Industrials (US)": "XLI",
            "Utilities (US)": "XLU",
            "Real Estate (US)": "XLRE",
            "BIST 100 (TR)": "XU100.IS",
            "BIST Bank (TR)": "XBANK.IS",
            "BIST Industrial (TR)": "XUSIN.IS",
            "DAX (DE)": "^GDAXI",
            "FTSE 100 (UK)": "^FTSE",
            "CAC 40 (FR)": "^FCHI",
            "Bitcoin (Crypto)": "BTC-USD",
            "Ethereum (Crypto)": "ETH-USD"
        }

        results = []
        for name, ticker in sectors.items():
            try:
                stock = yf.Ticker(ticker)
                df = stock.history(period="1mo")
                if df.empty: continue

                perf_1w = (df['Close'].iloc[-1] / df['Close'].iloc[-5] - 1) * 100
                perf_1m = (df['Close'].iloc[-1] / df['Close'].iloc[0] - 1) * 100

                # Relative volume: current volume vs 20-day average
                rel_vol = df['Volume'].iloc[-1] / df['Volume'].rolling(20).mean().iloc[-1]

                results.append({
                    "sector": name,
                    "ticker": ticker,
                    "performance_1w": round(perf_1w, 2),
                    "performance_1m": round(perf_1m, 2),
                    "relative_volume": round(rel_vol, 2),
                    "flow_strength": "Strong Inflow" if perf_1w > 2 and rel_vol > 1.2 else "Stable" if abs(perf_1w) < 1 else "Outflow" if perf_1w < -2 else "Weak Inflow"
                })
            except:
                continue

        return results
