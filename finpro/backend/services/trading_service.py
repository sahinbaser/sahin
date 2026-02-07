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
    def get_trade_signals(df: pd.DataFrame):
        """
        Calculates dynamic SL and TP based on ATR and recent volatility.
        """
        if df is None or len(df) < 20:
            return None

        current_price = df['Close'].iloc[-1]
        atr = TradingService.calculate_atr(df).iloc[-1]

        # Stop Loss: 2 * ATR below current price for Long
        stop_loss = current_price - (2 * atr)

        # Take Profit: 3 * ATR above current price for Long (1:1.5 Risk/Reward)
        take_profit = current_price + (3 * atr)

        risk_reward = (take_profit - current_price) / (current_price - stop_loss)

        return {
            "current_price": round(current_price, 2),
            "suggested_stop_loss": round(stop_loss, 2),
            "suggested_take_profit": round(take_profit, 2),
            "atr": round(atr, 2),
            "risk_reward_ratio": round(risk_reward, 2),
            "historical_success_rate": 62.5, # Placeholder
            "volatility_status": "High" if atr > (current_price * 0.03) else "Normal"
        }
