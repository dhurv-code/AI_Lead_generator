from fastapi import FastAPI
from app.routes import router
APP=FastAPI(
    title="AI Lead Generation API",
)