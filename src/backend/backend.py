from fastapi import APIRouter
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

router = APIRouter()

Base = declarative_base()

class Course(Base):
    __tablename__ = "courses"

    id = Column(String(36), primary_key=True)
    code = Column(String(20), unique=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    credits = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship with schedules
    schedules = relationship("Schedule", back_populates="course")

class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(String(36), primary_key=True)
    course_id = Column(String(36), ForeignKey('courses.id'), nullable=False)
    lecturer = Column(String(100), nullable=False)
    time = Column(String(50), nullable=False)  # Format: HH:MM-HH:MM
    day = Column(String(20), nullable=False)   # Monday, Tuesday, etc.
    room = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship with course
    course = relationship("Course", back_populates="schedules")

# Database setup
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator

# SQLite connection URL
SQLITE_URL = "sqlite:///./timetable.db"

# Create SQLite engine
engine = create_engine(
    SQLITE_URL,
    connect_args={"check_same_thread": False}
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables
Base.metadata.create_all(bind=engine)

def get_db() -> Generator[Session, None, None]:
    """Get database session"""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
