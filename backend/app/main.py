from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from app.routes import task_routes
from app.middleware.error_handler import (
    validation_exception_handler,
    http_exception_handler,
    generic_exception_handler
)

app = FastAPI(
    title="Task Management System API",
    description="REST API for managing tasks with search, filter, sort, and validation capabilities.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

app.include_router(task_routes.router)

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "healthy"}
