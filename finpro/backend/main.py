from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.data_service import DataService
from services.anomaly_service import AnomalyService
from services.dividend_service import DividendService
from services.trading_service import TradingService
from services.money_flow_service import MoneyFlowService
from services.risk_service import RiskService
from services.membership_service import MembershipService
from services.portfolio_service import PortfolioService
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="FinPro API")

class PortfolioItem(BaseModel):
    user_id: str
    ticker: str
    notes: Optional[str] = ""

class DividendSimRequest(BaseModel):
    initial_capital: float
    monthly_contribution: float
    annual_dividend_yield: float
    dividend_growth_rate: float
    stock_price_growth_rate: float
    monthly_expenses: float
    inflation_rate: float
    years: Optional[int] = 40

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to FinPro Professional Financial Analysis API"}

@app.get("/api/stock/{ticker}")
async def get_stock(ticker: str):
    data = DataService.get_stock_data(ticker)
    if data is None or data.empty:
        raise HTTPException(status_code=404, detail="Ticker not found or no data available")

    # Convert dataframe to JSON serializable format
    result = data.reset_index().to_dict(orient="records")
    # Convert timestamps to strings
    for row in result:
        row['Date'] = row['Date'].strftime('%Y-%m-%d')

    return result

@app.get("/api/stock/{ticker}/fundamentals")
async def get_fundamentals(ticker: str):
    data = DataService.get_fundamental_data(ticker)
    if data is None:
        raise HTTPException(status_code=404, detail="Fundamentals not found")

    # Prepare data for JSON (DataFrames need conversion)
    fundamentals = {
        "info": data["info"],
        "balance_sheet": data["balance_sheet"].to_dict() if not data["balance_sheet"].empty else {},
        "financials": data["financials"].to_dict() if not data["financials"].empty else {},
        "cashflow": data["cashflow"].to_dict() if not data["cashflow"].empty else {}
    }
    return fundamentals

@app.get("/api/analysis/anomaly/{ticker}")
async def get_anomaly_analysis(ticker: str):
    data = DataService.get_stock_data(ticker, period="6mo")
    if data is None or data.empty:
        raise HTTPException(status_code=404, detail="Data not found")

    analysis = AnomalyService.calculate_naturalness_score(data)
    return analysis

@app.post("/api/analysis/dividend-simulator")
async def simulate_dividend(req: DividendSimRequest):
    result = DividendService.simulate_independence(
        initial_capital=req.initial_capital,
        monthly_contribution=req.monthly_contribution,
        annual_dividend_yield=req.annual_dividend_yield,
        dividend_growth_rate=req.dividend_growth_rate,
        stock_price_growth_rate=req.stock_price_growth_rate,
        monthly_expenses=req.monthly_expenses,
        inflation_rate=req.inflation_rate,
        years=req.years
    )
    return result

@app.get("/api/analysis/trading-signals/{ticker}")
async def get_trading_signals(ticker: str):
    data = DataService.get_stock_data(ticker, period="3mo")
    if data is None or data.empty:
        raise HTTPException(status_code=404, detail="Data not found")

    signals = TradingService.get_trade_signals(data)
    return signals

@app.get("/api/analysis/money-flow")
async def get_money_flow():
    flows = MoneyFlowService.get_sector_flows()
    return flows

@app.get("/api/analysis/risk/{ticker}")
async def get_risk_analysis(ticker: str):
    fundamentals = DataService.get_fundamental_data(ticker)
    if fundamentals is None:
        raise HTTPException(status_code=404, detail="Fundamentals not found")

    z_score = RiskService.calculate_altman_z_score(fundamentals)
    stress_test = RiskService.run_stress_test(ticker)

    return {
        "z_score_analysis": z_score,
        "stress_test": stress_test
    }

@app.get("/api/membership/plans")
async def get_plans():
    return MembershipService.get_plans()

@app.get("/api/portfolio/{user_id}")
async def get_portfolio(user_id: str):
    return PortfolioService.get_user_portfolio(user_id)

@app.post("/api/portfolio")
async def add_portfolio(item: PortfolioItem):
    return PortfolioService.add_to_portfolio(item.user_id, item.ticker, item.notes)

@app.delete("/api/portfolio/{user_id}/{portfolio_id}")
async def delete_portfolio(user_id: str, portfolio_id: int):
    return PortfolioService.remove_from_portfolio(user_id, portfolio_id)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
