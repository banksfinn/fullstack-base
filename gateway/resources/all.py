from enum import Enum


class EntityState(str, Enum):
    ACTIVE = "ACTIVE"
    DELETED = "DELETED"
