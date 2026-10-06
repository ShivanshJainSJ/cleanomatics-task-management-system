import uuid
from datetime import datetime, timezone

def get_current_iso():
    return datetime.now(timezone.utc).isoformat()

def get_initial_tasks():
    now = get_current_iso()
    return {
        "task-101": {
            "id": "task-101",
            "title": "Upgrade authentication service to OAuth 2.0",
            "description": "Migrate legacy token authentication to standard OAuth 2.0 authorization code flow with PKCE.",
            "status": "in_progress",
            "priority": "high",
            "dueDate": "2026-10-15T18:00:00Z",
            "createdAt": now,
            "updatedAt": now
        },
        "task-102": {
            "id": "task-102",
            "title": "Audit database query performance",
            "description": "Identify slow database queries in analytics endpoints and add appropriate indexes to reduce response latency.",
            "status": "pending",
            "priority": "medium",
            "dueDate": "2026-10-20T12:00:00Z",
            "createdAt": now,
            "updatedAt": now
        },
        "task-103": {
            "id": "task-103",
            "title": "Update API client documentation",
            "description": "Publish updated OpenAPI specs and code snippets for external developer integration endpoints.",
            "status": "completed",
            "priority": "low",
            "dueDate": "2026-10-05T17:00:00Z",
            "createdAt": now,
            "updatedAt": now
        },
        "task-104": {
            "id": "task-104",
            "title": "Implement CSV export for audit logs",
            "description": "Allow workspace administrators to download historical system action logs as structured CSV files.",
            "status": "pending",
            "priority": "high",
            "dueDate": "2026-10-25T15:00:00Z",
            "createdAt": now,
            "updatedAt": now
        },
        "task-105": {
            "id": "task-105",
            "title": "Refactor frontend component styling",
            "description": "Convert legacy styling tokens to unified Tailwind CSS design primitives across all dashboard views.",
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
