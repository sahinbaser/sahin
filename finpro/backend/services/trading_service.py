import pandas as pd
import numpy as np

class TradingService:
    @staticmethod
    def calculate_atr(df: pd.DataFrame, period: int = 14):
        high_low = df['High'] - df['Low']
        high_close = np.abs(df['High'] - df['Close'].shift())
        low_close = np.abs(df['Low'] - df['Close'].shift())
        ranges = pd.concat([high_low, high_close, low_close], axis=1)
        true_range = np.max(ranges, axis=1)
        atr = true_range.rolling(period).mean()
        return atr

    @staticmethod
    def calculate_rsi(df: pd.DataFrame, period: int = 14):
        delta = df['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return rsi

    @staticmethod
    def calculate_macd(df: pd.DataFrame):
        exp1 = df['Close'].ewm(span=12, adjust=False).mean()
        exp2 = df['Close'].ewm(span=26, adjust=False).mean()
        macd = exp1 - exp2
        signal = macd.ewm(span=9, adjust=False).mean()
        return macd, signal

    @staticmethod
    def get_trade_signals(df: pd.DataFrame):
        """
        Calculates dynamic SL and TP based on ATR and recent volatility.
        """
        if df is None or len(df) < 26:
            return None

        current_price = df['Close'].iloc[-1]
        atr = TradingService.calculate_atr(df).iloc[-1]

        # Stop Loss: 2 * ATR below current price for Long
        stop_loss = current_price - (2 * atr)

        # Take Profit: 3 * ATR above current price for Long (1:1.5 Risk/Reward)
        take_profit = current_price + (3 * atr)

        risk_reward = (take_profit - current_price) / (current_price - stop_loss)

        rsi = TradingService.calculate_rsi(df).iloc[-1]
        macd, macd_signal = TradingService.calculate_macd(df)
        macd_val = macd.iloc[-1]
        macd_sig_val = macd_signal.iloc[-1]

        # Basic signal logic
        signal_type = "HOLD"
        if rsi < 30 and macd_val > macd_sig_val:
            signal_type = "STRONG BUY"
        elif rsi < 40:
            signal_type = "BUY"
        elif rsi > 70 and macd_val < macd_sig_val:
            signal_type = "STRONG SELL"
        elif rsi > 60:
            signal_type = "SELL"

        return {
            "current_price": round(current_price, 2),
            "suggested_stop_loss": round(stop_loss, 2),
            "suggested_take_profit": round(take_profit, 2),
            "atr": round(atr, 2),
            "rsi": round(rsi, 2),
            "macd": round(macd_val, 4),
            "signal": signal_type,
            "risk_reward_ratio": round(risk_reward, 2),
            "historical_success_rate": 62.5, # Placeholder
            "volatility_status": "High" if atr > (current_price * 0.03) else "Normal"
        }
