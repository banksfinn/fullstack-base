from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from api.router import api_router

app = FastAPI(
    title="INSERT_TITLE_HERE",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
