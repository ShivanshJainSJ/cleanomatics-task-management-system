from typing import List, Optional
from fastapi import HTTPException, status
from app.services.task_service import task_service
from app.schemas.task_schema import TaskCreate, TaskUpdate

class TaskController:
    def list_tasks(
        self,
        search: Optional[str] = None,
        status_param: Optional[str] = None,
        priority: Optional[str] = None,
        sort_by: Optional[str] = "createdAt",
        sort_order: Optional[str] = "desc"
    ) -> List[dict]:
        return task_service.get_tasks(
            search=search,
            status=status_param,
            priority=priority,
            sort_by=sort_by,
            sort_order=sort_order
        )

    def get_task(self, task_id: str) -> dict:
        task = task_service.get_task_by_id(task_id)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Task with ID '{task_id}' not found."
            )
        return task

    def create_task(self, task_data: TaskCreate) -> dict:
        return task_service.create_task(task_data)

    def update_task(self, task_id: str, task_data: TaskUpdate) -> dict:
        task = task_service.update_task(task_id, task_data)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Task with ID '{task_id}' not found."
            )
        return task

    def delete_task(self, task_id: str) -> dict:
        success = task_service.delete_task(task_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Task with ID '{task_id}' not found."
            )
        return {"message": "Task deleted successfully.", "id": task_id}

task_controller = TaskController()
