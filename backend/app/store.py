import uuid
from datetime import datetime, timezone

def get_current_iso():
    return datetime.now(timezone.utc).isoformat()

def get_initial_tasks():
    now = get_current_iso()
    return {
        "task-101": {
            "id": "task-101",
            "title": "Improve real-time laundry order tracking",
            "description": "Optimize order status updates so customers can see pickup, processing, ready-for-delivery, and delivered stages with minimal delay.",
            "status": "in_progress",
            "priority": "high",
            "dueDate": "2026-10-15T18:00:00Z",
            "createdAt": now,
            "updatedAt": now
        },
        "task-102": {
            "id": "task-102",
            "title": "Add automated customer pickup notifications",
            "description": "Trigger SMS, WhatsApp, or push notifications when an order becomes ready for pickup and when the delivery workflow begins.",
            "status": "pending",
            "priority": "medium",
            "dueDate": "2026-10-20T12:00:00Z",
            "createdAt": now,
            "updatedAt": now
        },
        "task-103": {
            "id": "task-103",
            "title": "Update laundry order status API documentation",
            "description": "Document the order lifecycle, status transitions, request payloads, and response formats for mobile and business applications.",
            "status": "completed",
            "priority": "low",
            "dueDate": "2026-10-05T17:00:00Z",
            "createdAt": now,
            "updatedAt": now
        },
        "task-104": {
            "id": "task-104",
            "title": "Implement stain detection result processing",
            "description": "Process garment inspection results from the AI pipeline and store stain type, severity, and recommended treatment information with the laundry order.",
            "status": "pending",
            "priority": "high",
            "dueDate": "2026-10-25T15:00:00Z",
            "createdAt": now,
            "updatedAt": now
        },
        "task-105": {
            "id": "task-105",
            "title": "Build franchise branch performance dashboard",
            "description": "Provide branch-level metrics for orders, revenue, order completion, customer activity, and operational performance.",
            "status": "in_progress",
            "priority": "medium",
            "dueDate": "2026-10-18T16:00:00Z",
            "createdAt": now,
            "updatedAt": now
        }
    }

class TaskStore:
    def __init__(self):
        self._tasks = get_initial_tasks()

    def get_all(self):
        return list(self._tasks.values())

    def get_by_id(self, task_id: str):
        return self._tasks.get(task_id)

    def create(self, task_data: dict):
        task_id = str(uuid.uuid4())
        now = get_current_iso()
        task = {
            "id": task_id,
            "title": task_data["title"],
            "description": task_data["description"],
            "status": task_data.get("status", "pending"),
            "priority": task_data.get("priority", "medium"),
            "dueDate": task_data["dueDate"],
            "createdAt": now,
            "updatedAt": now
        }
        self._tasks[task_id] = task
        return task

    def update(self, task_id: str, update_data: dict):
        if task_id not in self._tasks:
            return None
        existing = self._tasks[task_id]
        now = get_current_iso()
        for key, value in update_data.items():
            if value is not None:
                existing[key] = value
        existing["updatedAt"] = now
        self._tasks[task_id] = existing
        return existing

    def delete(self, task_id: str):
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False

    def clear(self):
        self._tasks = {}

    def reset_to_initial(self):
        self._tasks = get_initial_tasks()

task_store = TaskStore()
