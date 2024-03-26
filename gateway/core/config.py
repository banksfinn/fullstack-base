from pydantic_settings import BaseSettings
import os
from typing import Literal


def get_mongo_db_string() -> str:
    mongo_auth = os.environ["MONGO_DB_USERNAME"] + ":" + os.environ["MONGO_DB_PASSWORD"]
    mongo_url = os.environ["MONGO_DB_URL"] + ":27017"

    return f"mongodb://{mongo_auth}@{mongo_url}"


class Settings(BaseSettings):
    # TODO: Change this string
    SECRET_KEY: str = os.environ["GATEWAY_SECRET_KEY"]
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    # EXAMPLE_CLIENT_ID: str = os.environ["EXAMPLE_CLIENT_ID"]
    # EXAMPLE_CLIENT_SECRET: str = os.environ["EXAMPLE_CLIENT_SECRET"]
    ENVIRONMENT: Literal["local", "sandbox", "production"] = os.environ["ENVIRONMENT"]

    MONGO_DB_STRING: str = get_mongo_db_string()


settings = Settings()
