from pydantic import BaseModel, Field
from datetime import date

# 🔴 DONOR SCHEMAS
class DonorCreate(BaseModel):
    name: str
    age: int = Field(..., ge=18)
    blood_group: str
    location: str
    last_donation_date: date


# 🔵 USER SCHEMAS
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    username: str
    password: str