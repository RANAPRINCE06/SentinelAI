from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.session import get_db
from app.models.domain import Analysis, Topic
from app.api.auth import get_current_user
from app.models.domain import User

router = APIRouter()

@router.get("/dashboard")
def get_dashboard_metrics(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total = db.query(Analysis).filter(Analysis.user_id == current_user.id).count()
    
    sentiment_counts = db.query(Analysis.sentiment, func.count(Analysis.id)).\
        filter(Analysis.user_id == current_user.id).\
        group_by(Analysis.sentiment).all()
        
    metrics = {
        "total_analyses": total,
        "positive": 0,
        "negative": 0,
        "neutral": 0
    }
    
    for sentiment, count in sentiment_counts:
        if sentiment in metrics:
            metrics[sentiment] = count
            
    return metrics

@router.get("/topics")
def get_top_topics(db: Session = Depends(get_db), limit: int = 10):
    topics = db.query(Topic).order_by(Topic.frequency.desc()).limit(limit).all()
    return [{"keyword": t.keyword, "frequency": t.frequency} for t in topics]
