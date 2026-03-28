class DividendService:
    @staticmethod
    def simulate_independence(
        initial_capital: float,
        monthly_contribution: float,
        annual_dividend_yield: float,
        dividend_growth_rate: float,
        stock_price_growth_rate: float,
        monthly_expenses: float,
        inflation_rate: float,
        years: int = 40
    ):
        """
        Simulates portfolio growth and dividend income over time.
        All rates are expected as decimals (e.g., 0.05 for 5%).
        """
        portfolio_value = initial_capital
        monthly_data = []
        independence_year = None

        current_monthly_expenses = monthly_expenses

        for year in range(1, years + 1):
            annual_dividend = 0
            for month in range(1, 13):
                # Monthly contribution
                portfolio_value += monthly_contribution

                # Monthly stock growth (approximate)
                portfolio_value *= (1 + stock_price_growth_rate / 12)

                # Monthly dividend reinvestment (approximate)
                monthly_div = (portfolio_value * annual_dividend_yield / 12)
                portfolio_value += monthly_div
                annual_dividend += monthly_div

                # Inflation adjustment for expenses
                current_monthly_expenses *= (1 + inflation_rate / 12)

            # Check for financial independence
            monthly_passive_income = (portfolio_value * annual_dividend_yield) / 12
            if independence_year is None and monthly_passive_income >= current_monthly_expenses:
                independence_year = year

            monthly_data.append({
                "year": year,
                "portfolio_value": round(portfolio_value, 2),
                "annual_dividend": round(annual_dividend, 2),
                "monthly_dividend": round(monthly_passive_income, 2),
                "monthly_expenses": round(current_monthly_expenses, 2)
            })

        return {
            "independence_year": independence_year,
            "simulation_data": monthly_data,
            "final_portfolio_value": round(portfolio_value, 2),
            "status": "Success" if independence_year else "Not reached within simulation period"
        }
