from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute
from api.router import api_router


def generate_unique_id(route: APIRoute):
    return f"{route.name}"


app = FastAPI(title="Sample Project", generate_unique_id_function=generate_unique_id)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
