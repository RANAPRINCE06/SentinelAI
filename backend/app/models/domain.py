from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="user")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    analyses = relationship("Analysis", back_populates="user")
    keywords = relationship("MonitoringKeyword", back_populates="user")
    summaries = relationship("Summary", back_populates="user")
    reports = relationship("Report", back_populates="user")

class Analysis(Base):
    __tablename__ = "analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    text = Column(Text, nullable=False)
    sentiment = Column(String) # positive, negative, neutral
    confidence_score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="analyses")
    emotions = relationship("EmotionAnalysis", back_populates="analysis", uselist=False)

class EmotionAnalysis(Base):
    __tablename__ = "emotion_analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"))
    joy = Column(Float, default=0.0)
    anger = Column(Float, default=0.0)
    fear = Column(Float, default=0.0)
    sadness = Column(Float, default=0.0)
    surprise = Column(Float, default=0.0)
    
    analysis = relationship("Analysis", back_populates="emotions")

class Topic(Base):
    __tablename__ = "topics"
    
    id = Column(Integer, primary_key=True, index=True)
    keyword = Column(String, unique=True, index=True)
    frequency = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class MonitoringKeyword(Base):
    __tablename__ = "monitoring_keywords"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    keyword = Column(String, index=True)
    status = Column(String, default="active") # active, paused
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="keywords")

class Summary(Base):
    __tablename__ = "summaries"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    summary_text = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="summaries")

class Report(Base):
    __tablename__ = "reports"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    report_type = Column(String) # PDF, CSV
    file_path = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="reports")
