from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import engine, SessionLocal, Base
import models, schemas

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS (important for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create tables
Base.metadata.create_all(bind=engine)


# ✅ DB connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ HOME
@app.get("/")
def home():
    return {"message": "API is running"}


# 🔥 CREATE DONOR
@app.post("/donor")
def create_donor(donor: schemas.DonorCreate, db: Session = Depends(get_db)):

    existing = db.query(models.Donor).filter(
        func.lower(models.Donor.name) == donor.name.lower(),
        func.lower(models.Donor.location) == donor.location.lower()
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Donor already exists")

    new_donor = models.Donor(
        name=donor.name,
        age=donor.age,
        blood_group=donor.blood_group,
        location=donor.location,
        last_donation_date=donor.last_donation_date
    )

    db.add(new_donor)
    db.commit()
    db.refresh(new_donor)

    return new_donor


# 🔥 GET ALL DONORS
@app.get("/donors")
def get_donors(db: Session = Depends(get_db)):
    return db.query(models.Donor).all()


# 🔥 UPDATE DONOR
@app.put("/donor/{donor_id}")
def update_donor(donor_id: int, donor: schemas.DonorCreate, db: Session = Depends(get_db)):

    existing = db.query(models.Donor).filter(models.Donor.id == donor_id).first()

    if not existing:
        raise HTTPException(status_code=404, detail="Donor not found")

    existing.name = donor.name
    existing.age = donor.age
    existing.blood_group = donor.blood_group
    existing.location = donor.location
    existing.last_donation_date = donor.last_donation_date

    db.commit()
    db.refresh(existing)

    return existing


# 🔥 DELETE DONOR
@app.delete("/donor/{donor_id}")
def delete_donor(donor_id: int, db: Session = Depends(get_db)):

    donor = db.query(models.Donor).filter(models.Donor.id == donor_id).first()

    if not donor:
        raise HTTPException(status_code=404, detail="Donor not found")

    db.delete(donor)
    db.commit()

    return {"message": "Donor deleted"}


# 🔥 SEARCH DONORS (✅ NO 90-DAY LOGIC)
@app.get("/match-donors")
def match_donors(blood_group: str, location: str, db: Session = Depends(get_db)):

    donors = db.query(models.Donor).filter(
        func.lower(models.Donor.blood_group) == blood_group.lower(),
        func.lower(models.Donor.location).contains(location.lower())
    ).all()

    return donors


# 🔥 REGISTER USER
@app.post("/register")
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing = db.query(models.User).filter(
        models.User.username == user.username
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = models.User(
        username=user.username,
        password=user.password  # (plain for now)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}


# 🔥 LOGIN USER
@app.post("/login")
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):

    existing = db.query(models.User).filter(
        models.User.username == user.username
    ).first()

    if not existing or existing.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful"}
@app.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total_donors = db.query(models.Donor).count()

    return {
        "total_donors": total_donors,
        "lives_impacted": total_donors * 3,
        "availability": "24/7"
    }