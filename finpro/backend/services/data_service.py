import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

class DataService:
    @staticmethod
    def get_stock_data(ticker: str, period: str = "1y", interval: str = "1d"):
        """
        Fetches OHLCV data for a given ticker.
         tickers examples: 'AAPL' (US), 'THYAO.IS' (BIST), 'SAP.DE' (EU)
        """
        try:
            stock = yf.Ticker(ticker)
            df = stock.history(period=period, interval=interval)
            if df.empty:
                return None
            return df
        except Exception as e:
            print(f"Error fetching data for {ticker}: {e}")
            return None

    @staticmethod
    def get_fundamental_data(ticker: str):
        """
        Fetches fundamental data (Balance Sheet, Income Statement, etc.)
        """
        try:
            stock = yf.Ticker(ticker)
            info = stock.info
            balance_sheet = stock.balance_sheet
            financials = stock.financials
            cashflow = stock.cashflow
            return {
                "info": info,
                "balance_sheet": balance_sheet,
                "financials": financials,
                "cashflow": cashflow
            }
        except Exception as e:
            print(f"Error fetching fundamental data for {ticker}: {e}")
            return None

    @staticmethod
    def get_sector_data(sector_tickers: list):
        """
        Fetches data for multiple tickers in a sector to compare.
        """
        data = {}
        for ticker in sector_tickers:
            df = DataService.get_stock_data(ticker, period="1mo")
            if df is not None:
                data[ticker] = df
        return data
