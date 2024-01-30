from pydantic_settings import BaseSettings
import os
from typing import Literal


class Settings(BaseSettings):
    # TODO: Change this string
    SECRET_KEY: str = os.environ["SECRET_KEY"]
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    EXAMPLE_CLIENT_ID: str = os.environ["EXAMPLE_CLIENT_ID"]
    EXAMPLE_CLIENT_SECRET: str = os.environ["EXAMPLE_CLIENT_SECRET"]
    ENVIRONMENT: Literal["sandbox", "production"] = os.environ["ENVIRONMENT"]


settings = Settings()
