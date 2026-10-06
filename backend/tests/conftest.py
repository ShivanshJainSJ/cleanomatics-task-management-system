import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.store import task_store

@pytest.fixture(autouse=True)
def reset_store():
    task_store.reset_to_initial()
    yield
    task_store.reset_to_initial()

@pytest.fixture
def client():
    return TestClient(app)
