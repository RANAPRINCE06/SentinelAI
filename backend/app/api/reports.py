from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database.session import get_db
from app.api.auth import get_current_user
from app.models.domain import User, Report

router = APIRouter()

class ReportRequest(BaseModel):
    report_type: str # 'PDF' or 'CSV'

def mock_generate_report_pdf(user_id: int, report_type: str, db: Session):
    # Simulate generating a PDF or CSV report
    file_path = f"/reports/user_{user_id}_report.{report_type.lower()}"
    
    db_report = Report(user_id=user_id, report_type=report_type, file_path=file_path)
    db.add(db_report)
    db.commit()

@router.post("/generate")
def generate_report(request: ReportRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    
    if request.report_type not in ["PDF", "CSV"]:
        return {"error": "Invalid report type"}
        
    # Queue the report generation as a background task
    background_tasks.add_task(mock_generate_report_pdf, current_user.id, request.report_type, db)
    
    return {"message": "Report generation started. It will be available shortly."}
