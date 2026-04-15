from sqlalchemy import Column, Integer, String, Date
from database import Base

# 🔴 DONOR TABLE
class Donor(Base):
    __tablename__ = "donors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer)
    blood_group = Column(String)
    location = Column(String)
    last_donation_date = Column(Date)


# 🔵 USER TABLE
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)