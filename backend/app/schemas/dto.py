from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    created_at: datetime
    class Config:
        from_attributes = True

# Sentiment Schemas
class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment: str
    confidence: float

class BulkSentimentRequest(BaseModel):
    texts: List[str]

class BulkSentimentResponse(BaseModel):
    results: List[SentimentResponse]
    statistics: dict

# Emotion Schemas
class EmotionResponse(BaseModel):
    joy: float
    anger: float
    fear: float
    sadness: float
    surprise: float

# Topic Schemas
class TopicResponse(BaseModel):
    keywords: List[str]
    entities: List[str]

# Summary Schemas
class SummaryResponse(BaseModel):
    summary_text: str

# Monitoring Schemas
class KeywordCreate(BaseModel):
    keyword: str

class KeywordResponse(BaseModel):
    id: int
    keyword: str
    status: str
    class Config:
        from_attributes = True
