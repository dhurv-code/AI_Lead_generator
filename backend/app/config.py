from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    MONGODB_URI: str = os.getenv("MONGODB_URI")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")
    GOOGLE_PLACES_API_KEY=os.getenv("GOOGLE_PLACES_API_KEY")

settings=Settings()