from typing import List, Optional
from app.store import task_store
from app.schemas.task_schema import TaskCreate, TaskUpdate

class TaskService:
    def get_tasks(
        self,
        search: Optional[str] = None,
        status: Optional[str] = None,
        priority: Optional[str] = None,
        sort_by: Optional[str] = "createdAt",
        sort_order: Optional[str] = "desc"
    ) -> List[dict]:
        tasks = task_store.get_all()

        if search:
            query = search.strip().lower()
            tasks = [
                t for t in tasks
                if query in t["title"].lower() or query in t["description"].lower()
            ]

        if status:
            tasks = [t for t in tasks if t["status"] == status]

        if priority:
            tasks = [t for t in tasks if t["priority"] == priority]

        priority_order = {"low": 1, "medium": 2, "high": 3}

        if sort_by:
            reverse = (sort_order == "desc")
            if sort_by == "priority":
                tasks.sort(key=lambda t: priority_order.get(t["priority"], 0), reverse=reverse)
            elif sort_by in ["dueDate", "createdAt", "updatedAt", "title"]:
                tasks.sort(key=lambda t: t.get(sort_by, ""), reverse=reverse)
            else:
                tasks.sort(key=lambda t: t.get("createdAt", ""), reverse=True)

        return tasks

    def get_task_by_id(self, task_id: str) -> Optional[dict]:
        return task_store.get_by_id(task_id)

    def create_task(self, task_data: TaskCreate) -> dict:
        data = task_data.model_dump()
        return task_store.create(data)

    def update_task(self, task_id: str, task_data: TaskUpdate) -> Optional[dict]:
        update_dict = task_data.model_dump(exclude_unset=True)
        return task_store.update(task_id, update_dict)

    def delete_task(self, task_id: str) -> bool:
        return task_store.delete(task_id)

task_service = TaskService()
