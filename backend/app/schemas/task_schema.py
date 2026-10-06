from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field, field_validator

class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class TaskPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    status: TaskStatus = TaskStatus.PENDING
    priority: TaskPriority = TaskPriority.MEDIUM
    dueDate: str = Field(..., min_length=1)

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("Title cannot be empty or whitespace only")
        return stripped

    @field_validator("description")
    @classmethod
    def validate_description(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("Description cannot be empty or whitespace only")
        return stripped

    @field_validator("dueDate")
    @classmethod
    def validate_due_date(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("Due date cannot be empty")
        return stripped

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    dueDate: Optional[str] = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        stripped = value.strip()
        if not stripped:
            raise ValueError("Title cannot be empty or whitespace only")
        return stripped

    @field_validator("description")
    @classmethod
    def validate_description(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        stripped = value.strip()
        if not stripped:
            raise ValueError("Description cannot be empty or whitespace only")
        return stripped

    @field_validator("dueDate")
    @classmethod
    def validate_due_date(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return value
        stripped = value.strip()
        if not stripped:
            raise ValueError("Due date cannot be empty")
        return stripped

class TaskResponse(BaseModel):
    id: str
    title: str
    description: str
    status: TaskStatus
    priority: TaskPriority
    dueDate: str
    createdAt: str
    updatedAt: str
