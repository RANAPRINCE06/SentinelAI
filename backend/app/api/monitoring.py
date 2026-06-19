from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.models.domain import MonitoringKeyword, User
from app.schemas.dto import KeywordCreate, KeywordResponse
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/keywords", response_model=KeywordResponse)
def add_keyword(keyword_in: KeywordCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_kw = MonitoringKeyword(user_id=current_user.id, keyword=keyword_in.keyword)
    db.add(db_kw)
    db.commit()
    db.refresh(db_kw)
    return db_kw

@router.delete("/keywords/{keyword_id}")
def remove_keyword(keyword_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_kw = db.query(MonitoringKeyword).filter(
        MonitoringKeyword.id == keyword_id, 
        MonitoringKeyword.user_id == current_user.id
    ).first()
    
    if not db_kw:
        raise HTTPException(status_code=404, detail="Keyword not found")
        
    db.delete(db_kw)
    db.commit()
    return {"message": "Keyword removed successfully"}

@router.put("/keywords/{keyword_id}/start")
def start_monitoring(keyword_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_kw = db.query(MonitoringKeyword).filter(
        MonitoringKeyword.id == keyword_id, 
        MonitoringKeyword.user_id == current_user.id
    ).first()
    
    if not db_kw:
        raise HTTPException(status_code=404, detail="Keyword not found")
        
    db_kw.status = "active"
    db.commit()
    
    # Normally this would dispatch a Celery task
    return {"message": f"Started monitoring for '{db_kw.keyword}'"}

@router.put("/keywords/{keyword_id}/stop")
def stop_monitoring(keyword_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_kw = db.query(MonitoringKeyword).filter(
        MonitoringKeyword.id == keyword_id, 
        MonitoringKeyword.user_id == current_user.id
    ).first()
    
    if not db_kw:
        raise HTTPException(status_code=404, detail="Keyword not found")
        
    db_kw.status = "paused"
    db.commit()
    
    # Normally this would cancel a Celery task
    return {"message": f"Paused monitoring for '{db_kw.keyword}'"}
