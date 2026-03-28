import pandas as pd

class RiskService:
    @staticmethod
    def calculate_altman_z_score(fundamentals: dict):
        """
        Calculates Altman Z-Score for public manufacturing companies.
        Z = 1.2A + 1.4B + 3.3C + 0.6D + 1.0E
        A = Working Capital / Total Assets
        B = Retained Earnings / Total Assets
        C = EBIT / Total Assets
        D = Market Value of Equity / Total Liabilities
        E = Sales / Total Assets
        """
        try:
            info = fundamentals.get("info", {})
            bs = fundamentals.get("balance_sheet")
            is_stmt = fundamentals.get("financials")

            if bs is None or is_stmt is None or bs.empty or is_stmt.empty:
                return None

            # Get latest available data
            latest_bs = bs.iloc[:, 0]
            latest_is = is_stmt.iloc[:, 0]

            total_assets = latest_bs.get("Total Assets", 0)
            working_capital = latest_bs.get("Working Capital", 0)
            retained_earnings = latest_bs.get("Retained Earnings", 0)
            ebit = latest_is.get("EBIT", 0)
            total_liabilities = latest_bs.get("Total Liabilities Net Minority Interest", 0)
            sales = latest_is.get("Total Revenue", 0)
            market_cap = info.get("marketCap", 0)

            if total_assets == 0 or total_liabilities == 0:
                return None

            A = working_capital / total_assets
            B = retained_earnings / total_assets
            C = ebit / total_assets
            D = market_cap / total_liabilities
            E = sales / total_assets

            z_score = 1.2*A + 1.4*B + 3.3*C + 0.6*D + 1.0*E

            # Risk interpretation
            if z_score > 2.99:
                status = "Safe Zone"
                risk_prob = "Low"
            elif z_score > 1.81:
                status = "Grey Zone"
                risk_prob = "Moderate"
            else:
                status = "Distress Zone"
                risk_prob = "High"

            return {
                "z_score": round(z_score, 2),
                "status": status,
                "risk_probability": risk_prob,
                "components": {
                    "A": round(A, 4),
                    "B": round(B, 4),
                    "C": round(C, 4),
                    "D": round(D, 4),
                    "E": round(E, 4)
                }
            }
        except Exception as e:
            print(f"Error calculating Z-score: {e}")
            return None

    @staticmethod
    def run_stress_test(ticker: str):
        # Simulated stress test based on interest rates and revenue drops
        return {
            "scenario": "High Interest Rates (+5%) & Revenue Drop (-20%)",
            "impact_on_ebit": "-35%",
            "liquidity_risk": "Increased",
            "resilience_score": 65
        }
