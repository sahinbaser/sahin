from supabase_client import supabase

class PortfolioService:
    @staticmethod
    def get_user_portfolio(user_id: str):
        if not supabase:
            return [] # Mock for now if no supabase

        response = supabase.table("portfolios").select("*").eq("user_id", user_id).execute()
        return response.data

    @staticmethod
    def add_to_portfolio(user_id: str, ticker: str, notes: str = ""):
        if not supabase:
            return {"status": "mock_success", "ticker": ticker}

        data = {
            "user_id": user_id,
            "ticker": ticker,
            "notes": notes
        }
        response = supabase.table("portfolios").insert(data).execute()
        return response.data

    @staticmethod
    def remove_from_portfolio(user_id: str, portfolio_id: int):
        if not supabase:
            return {"status": "mock_deleted"}

        response = supabase.table("portfolios").delete().eq("id", portfolio_id).eq("user_id", user_id).execute()
        return response.data
