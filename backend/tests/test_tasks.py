def test_list_tasks(client):
    response = client.get("/api/tasks")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 5

def test_get_existing_task(client):
    response = client.get("/api/tasks/task-101")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "task-101"
    assert data["title"] == "Upgrade authentication service to OAuth 2.0"

def test_get_missing_task(client):
    response = client.get("/api/tasks/non-existent-id")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data

def test_create_valid_task(client):
    payload = {
        "title": "Build user notification service",
        "description": "Implement WebSockets and email triggers for real-time task updates.",
        "status": "pending",
        "priority": "high",
        "dueDate": "2026-11-01T10:00:00Z"
    }
    response = client.post("/api/tasks", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == payload["title"]
    assert data["description"] == payload["description"]
    assert data["status"] == "pending"
    assert data["priority"] == "high"
    assert "id" in data
    assert "createdAt" in data
    assert "updatedAt" in data

def test_reject_invalid_task_missing_title(client):
    payload = {
        "description": "Missing title test",
        "status": "pending",
        "priority": "low",
        "dueDate": "2026-11-01T10:00:00Z"
    }
    response = client.post("/api/tasks", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert "detail" in data

def test_reject_invalid_task_empty_title(client):
    payload = {
        "title": "   ",
        "description": "Empty title test",
        "status": "pending",
        "priority": "low",
        "dueDate": "2026-11-01T10:00:00Z"
    }
    response = client.post("/api/tasks", json=payload)
    assert response.status_code == 400

def test_update_existing_task(client):
    payload = {
        "title": "Updated Auth Task Title",
        "status": "completed"
    }
    response = client.put("/api/tasks/task-101", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "task-101"
    assert data["title"] == "Updated Auth Task Title"
    assert data["status"] == "completed"

def test_update_missing_task(client):
    payload = {
        "title": "Updated Non-existent Task"
    }
    response = client.put("/api/tasks/non-existent-id", json=payload)
    assert response.status_code == 404

def test_delete_existing_task(client):
    response = client.delete("/api/tasks/task-101")
    assert response.status_code == 200
    get_response = client.get("/api/tasks/task-101")
    assert get_response.status_code == 404

def test_delete_missing_task(client):
    response = client.delete("/api/tasks/non-existent-id")
    assert response.status_code == 404

def test_search_tasks(client):
    response = client.get("/api/tasks?search=OAuth")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == "task-101"

def test_filter_by_status(client):
    response = client.get("/api/tasks?status=completed")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["id"] == "task-103"

def test_filter_by_priority(client):
    response = client.get("/api/tasks?priority=high")
    assert response.status_code == 200
    data = response.json()
    assert all(task["priority"] == "high" for task in data)
