# Cleanomatics Task Management System

A full-stack task management application built for the Cleanomatics Software Engineering Intern assignment. The project consists of a FastAPI backend with in-memory storage and a Next.js frontend built with React, TypeScript, and Tailwind CSS.

The application allows users to create, view, edit, and delete tasks, with support for search, filtering, multi-field sorting, light and dark themes, and validation handling.

## Features

- Create, view, edit, and delete tasks
- Task status tracking (`pending`, `in_progress`, `completed`)
- Task priority levels (`low`, `medium`, `high`)
- Due date selection and formatted timestamps
- Search across task titles and descriptions (debounced)
- Filter by status and priority
- Sort by created date, due date, priority, or title (ascending and descending)
- Client-side and server-side validation
- Centralized error handling returning HTTP 400 for invalid request data
- Responsive layout for desktop and mobile screens
- Light and dark mode with persistent user preference
- Loading skeleton, empty states, and error messaging
- Interactive OpenAPI documentation via Swagger UI
- Automated backend tests with Pytest

## Tech Stack

| Part | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Backend | Python 3.13, FastAPI |
| Validation | Pydantic v2 |
| Server | Uvicorn |
| Storage | In-memory store (Python dictionary) |
| API Testing | Pytest, HTTPX |

## Project Structure

```text
Assigment/
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── main.py
│   │   └── store.py
│   ├── tests/
│   │   ├── conftest.py
│   │   └── test_tasks.py
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── app/
│   ├── components/
│   │   ├── layout/
│   │   ├── tasks/
│   │   └── ui/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── .env.example
│   └── package.json
└── README.md
```

- **routes**: Declares FastAPI endpoints and query parameters.
- **controllers**: Coordinates requests, delegates to services, and handles HTTP status codes.
- **services**: Implements business logic including search, filtering, and sorting.
- **schemas**: Pydantic models for request validation and response serialization.
- **middleware**: Intercepts validation errors and converts them to HTTP 400 responses.
- **store**: In-memory task repository holding records during server runtime.
- **components**: React components organized into layout, task features, and UI primitives.
- **hooks**: Custom React hooks for task state, debounced search, and theme switching.
- **services**: Fetch API client communicating with backend endpoints.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ShivanshJainSJ/Assigment.git
cd Assigment
```

### 2. Backend Setup

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend server starts at `http://localhost:8000`.

The `backend/.env.example` file outlines optional environment variables (`PORT`, `HOST`, `CORS_ORIGINS`). For local development, default values work without creating a `.env` file.

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend application starts at `http://localhost:3000`.

The frontend defaults to connecting to `http://localhost:8000`. If running on a different port or host, set `NEXT_PUBLIC_API_URL` in `frontend/.env.local` as indicated in `frontend/.env.example`.

## Running the Application

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/tasks` | List tasks (supports `search`, `status`, `priority`, `sort_by`, `sort_order`) |
| `GET` | `/api/tasks/{id}` | Get one task |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/{id}` | Update a task |
| `DELETE` | `/api/tasks/{id}` | Delete a task |
| `GET` | `/health` | Server health check |

Supported query parameters for `GET /api/tasks`:
- `search`: Matches query string against title and description (case-insensitive)
- `status`: Filter by `pending`, `in_progress`, or `completed`
- `priority`: Filter by `low`, `medium`, or `high`
- `sort_by`: Field to sort by (`createdAt`, `dueDate`, `priority`, `title`; defaults to `createdAt`)
- `sort_order`: Direction of sorting (`asc` or `desc`; defaults to `desc`)

## Task Model

Each task contains:
- `id`: Unique identifier (string UUID)
- `title`: Task title (string, 1–200 characters, non-empty)
- `description`: Detailed task description (string, non-empty)
- `status`: Current status (`pending`, `in_progress`, `completed`)
- `priority`: Priority level (`low`, `medium`, `high`)
- `dueDate`: Due date string (required, non-empty)
- `createdAt`: ISO 8601 creation timestamp
- `updatedAt`: ISO 8601 update timestamp

The application initializes with 5 mock tasks reflecting laundry technology operations (order tracking, pickup notifications, status API documentation, stain detection processing, and branch performance dashboards). These are sample tasks provided for testing and demonstration purposes.

## Validation and Error Handling

- `title`, `description`, and `dueDate` are required fields; empty values and strings containing only whitespace are rejected.
- `status` and `priority` must match valid enum values.
- FastAPI's default 422 response for `RequestValidationError` is intercepted by custom middleware in `app/middleware/error_handler.py` and returned as HTTP 400 Bad Request to match assignment specifications.
- Missing task IDs return HTTP 404 with a descriptive error message.
- Unexpected server exceptions return HTTP 500 without leaking stack traces.

## Frontend

The user interface includes:
- Task metrics overview (Total, Pending, In Progress, Completed counters)
- Filter bar with debounced search input, status filter, priority filter, and sort controls
- Responsive task card grid with status dot indicator, priority, due date, and creation date
- Create and edit modal forms with field validation and clear error feedback
- Dedicated task details modal with full metadata and action shortcuts
- Delete confirmation modal before task removal
- Loading skeleton, empty state, and error handling with toast notifications
- Light and dark mode support with localStorage persistence

## Backend Architecture

The backend follows a layered structure to maintain separation of concerns:
- Routes declare API endpoints and query parameters.
- Controllers validate and format inputs, coordinate requests, and handle HTTP status codes.
- Services implement query logic such as searching, filtering, and sorting.
- The in-memory task store keeps records in a Python dictionary during the process lifetime.

This separation keeps business logic decoupled from FastAPI transport code and makes endpoints straightforward to test.

## Testing

Run backend tests using pytest:

```bash
cd backend
python -m pytest tests
```

The test suite runs 13 tests covering task listing, search, filtering, sorting, retrieval, creation, validation handling (HTTP 400), updates, deletion, and 404 error cases.

## Build

To verify the frontend production build:

```bash
cd frontend
npm run build
```

This compiles TypeScript and generates static pages without errors.

## Screenshots

Screenshots can be added here before submission:
- Dashboard overview (Light and Dark mode)
- Task creation and edit modal
- Task details modal
- Delete confirmation dialog

## Notes

The application uses in-memory storage because persistent database storage was not required for the assignment. Restarting the backend server resets task data back to the initial sample tasks.

## Author

Shivansh Jain
- GitHub: [https://github.com/ShivanshJainSJ](https://github.com/ShivanshJainSJ)
- LinkedIn: [https://linkedin.com/in/shivansh-jain-sj](https://linkedin.com/in/shivansh-jain-sj)
