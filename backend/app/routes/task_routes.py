from typing import List, Optional
from fastapi import APIRouter, status, Query
from app.schemas.task_schema import TaskCreate, TaskUpdate, TaskResponse
from app.controllers.task_controller import task_controller

router = APIRouter(prefix="/api/tasks", tags=["Tasks"])

@router.get("", response_model=List[TaskResponse], status_code=status.HTTP_200_OK)
def get_all_tasks(
    search: Optional[str] = Query(None, description="Search query matching title or description"),
    status: Optional[str] = Query(None, description="Filter by status (pending, in_progress, completed)"),
    priority: Optional[str] = Query(None, description="Filter by priority (low, medium, high)"),
    sort_by: Optional[str] = Query("createdAt", description="Sort field (dueDate, createdAt, title, priority)"),
    sort_order: Optional[str] = Query("desc", description="Sort direction (asc, desc)")
):
    return task_controller.list_tasks(
        search=search,
        status_param=status,
        priority=priority,
        sort_by=sort_by,
        sort_order=sort_order
    )

@router.get("/{task_id}", response_model=TaskResponse, status_code=status.HTTP_200_OK)
def get_task_by_id(task_id: str):
    return task_controller.get_task(task_id)

@router.post("", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_new_task(task_data: TaskCreate):
    return task_controller.create_task(task_data)

@router.put("/{task_id}", response_model=TaskResponse, status_code=status.HTTP_200_OK)
def update_existing_task(task_id: str, task_data: TaskUpdate):
    return task_controller.update_task(task_id, task_data)

@router.delete("/{task_id}", status_code=status.HTTP_200_OK)
def delete_task_by_id(task_id: str):
    return task_controller.delete_task(task_id)
