import numpy as np
import pandas as pd
from scipy import stats

class AnomalyService:
    @staticmethod
    def calculate_naturalness_score(df: pd.DataFrame):
        """
        Calculates a score from 0 to 100 where 100 is perfectly natural
        and 0 is highly anomalous/manipulated.
        """
        if df is None or len(df) < 20:
            return {"score": 50, "reason": "Insufficient data"}

        # 1. Price-Volume Correlation
        # In a natural market, price increases often correlate with volume increases.
        correlation = df['Close'].pct_change().corr(df['Volume'].pct_change())

        # 2. Z-Score of Returns
        returns = df['Close'].pct_change().dropna()
        z_scores = np.abs(stats.zscore(returns))
        extreme_moves = np.sum(z_scores > 3) # More than 3 std devs

        # 3. Volume Spikes
        vol_mean = df['Volume'].rolling(window=20).mean()
        vol_std = df['Volume'].rolling(window=20).std()
        vol_z_score = (df['Volume'] - vol_mean) / vol_std
        extreme_volumes = np.sum(vol_z_score > 5)

        # 4. Pump and Dump detection (sharp rise followed by sharp fall)
        # Simplified: check for high kurtosis or skewness in returns
        kurtosis = returns.kurtosis()
        skewness = returns.skew()

        # Scoring Logic
        score = 100
        reasons = []

        if correlation < 0.1:
            score -= 20
            reasons.append("Low Price-Volume correlation")

        if extreme_moves > 5:
            score -= 20
            reasons.append("Frequent extreme price movements")

        if extreme_volumes > 3:
            score -= 20
            reasons.append("Unusual volume spikes detected")

        if abs(kurtosis) > 10:
            score -= 15
            reasons.append("High return kurtosis (fat tails)")

        score = max(0, min(100, score))

        # Strength: Weak, Medium, Strong
        strength = "Zayıf"
        if score < 40:
            strength = "Güçlü Anomali"
        elif score < 70:
            strength = "Orta Anomali"
        else:
            strength = "Zayıf / Normal"

        return {
            "score": score,
            "strength": strength,
            "reasons": reasons,
            "historical_similarity": 85.0, # Placeholder for more complex logic
            "anomaly_type": "Fiyat-Hacim Uyumsuzluğu" if correlation < 0.1 else "Genel Piyasa Davranışı"
        }
