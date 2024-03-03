from enum import Enum


class EntityState(str, Enum):
    ACTIVE = "ACTIVE"
    DELETED = "DELETED"


class ItemType(str, Enum):
    TYPE_A = "TYPE_A"
    TYPE_B = "TYPE_B"
    TYPE_C = "TYPE_C"
