import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-utilityhub-ai-platform-2026")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # DB URL: PostgreSQL fallback to SQLite
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./utilityhub.db"
    )
    
    PROJECT_NAME: str = "UtilityHub AI API"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ]

    class Config:
        case_sensitive = True

settings = Settings()
