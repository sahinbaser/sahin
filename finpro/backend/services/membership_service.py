class MembershipService:
    @staticmethod
    def get_plans():
        return [
            {"id": "free", "name": "Free", "price": 0, "features": ["Basic Analytics", "Daily Limits"]},
            {"id": "pro", "name": "Pro", "price": 19.99, "features": ["Advanced Anomalies", "Unlimited Signals", "Risk Reports"]},
            {"id": "whale", "name": "Whale", "price": 99.99, "features": ["Real-time Alerts", "Institutional Flows", "API Access"]}
        ]

    @staticmethod
    def check_access(user_id: str, module_id: str):
        # Logic to check if user has access to a specific module based on their plan
        return True # For now, allow all
