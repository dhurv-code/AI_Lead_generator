from fastapi import FastAPI
from app.api.routes import router
app=FastAPI(
    title="AI Lead Generation API",
)

app.include_router(router)