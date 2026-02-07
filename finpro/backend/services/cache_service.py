import time

class CacheService:
    def __init__(self, expiry=3600):
        self.cache = {}
        self.expiry = expiry

    def get(self, key):
        if key in self.cache:
            data, timestamp = self.cache[key]
            if time.time() - timestamp < self.expiry:
                return data
            else:
                del self.cache[key]
        return None

    def set(self, key, data):
        self.cache[key] = (data, time.time())

global_cache = CacheService()
