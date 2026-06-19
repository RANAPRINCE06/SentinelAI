from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.models.domain import Analysis, EmotionAnalysis, Topic
from app.schemas.dto import (
    SentimentRequest, SentimentResponse, 
    BulkSentimentRequest, BulkSentimentResponse,
    EmotionResponse, TopicResponse, SummaryResponse
)
from app.ai.engine import NLPEngine
from app.api.auth import get_current_user
from app.models.domain import User

router = APIRouter()

@router.post("/sentiment/analyze", response_model=SentimentResponse)
def analyze_sentiment(request: SentimentRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # 1. Analyze text using NLP engine
    result = NLPEngine.analyze_sentiment(request.text)
    
    # 2. Store historical analysis in DB
    db_analysis = Analysis(
        user_id=current_user.id,
        text=request.text,
        sentiment=result["sentiment"],
        confidence_score=result["confidence"]
    )
    db.add(db_analysis)
    db.commit()
    
    return SentimentResponse(**result)

@router.post("/sentiment/bulk", response_model=BulkSentimentResponse)
def bulk_analyze(request: BulkSentimentRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    results = []
    stats = {"positive": 0, "negative": 0, "neutral": 0}
    
    for text in request.texts:
        res = NLPEngine.analyze_sentiment(text)
        results.append(SentimentResponse(**res))
        stats[res["sentiment"]] += 1
        
        # Async tasks would be better here via Celery for massive files
        db_analysis = Analysis(
            user_id=current_user.id,
            text=text,
            sentiment=res["sentiment"],
            confidence_score=res["confidence"]
        )
        db.add(db_analysis)
        
    db.commit()
    return BulkSentimentResponse(results=results, statistics=stats)

@router.post("/emotions/analyze", response_model=EmotionResponse)
def analyze_emotions(request: SentimentRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    emotions = NLPEngine.analyze_emotions(request.text)
    return EmotionResponse(**emotions)

@router.post("/topics/extract", response_model=TopicResponse)
def extract_topics(request: SentimentRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    topics_data = NLPEngine.extract_topics(request.text)
    
    # Append new topics to global DB tracking
    for kw in topics_data["keywords"]:
        topic = db.query(Topic).filter(Topic.keyword == kw).first()
        if topic:
            topic.frequency += 1
        else:
            db.add(Topic(keyword=kw))
    db.commit()
            
    return TopicResponse(**topics_data)

@router.post("/summary/generate", response_model=SummaryResponse)
def generate_summary(request: BulkSentimentRequest, current_user: User = Depends(get_current_user)):
    # Using Gemini via NLP engine
    summary_text = NLPEngine.generate_summary(request.texts)
    return SummaryResponse(summary_text=summary_text)
