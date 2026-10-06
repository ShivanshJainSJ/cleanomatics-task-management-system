# Cleanomatics Task Management System

A practical, full-featured Task Management System built for the Cleanomatics Software Engineering Intern hiring assignment. The project features a FastAPI REST API backend with in-memory storage and a Next.js 14 / TypeScript / Tailwind CSS frontend.

---

## 1. Project Overview

The Task Management System is a lightweight internal workspace dashboard designed to organize, track, and manage team tasks. It supports complete CRUD (Create, Read, Update, Delete) operations, debounced title/description search, status and priority filtering, multi-field sorting, interactive task details, modal deletion confirmation, dark mode, responsive layouts, and centralized validation error handling.

---

## 2. Features

- **Dashboard Overview**: Metrics overview cards showing Total Tasks, Pending, In Progress, and Completed counters.
- **Task List View**: Grid of task cards displaying title, description, status badge, priority badge, due date, created date, and direct action triggers.
- **Task Creation**: Modal form with client-side and server-side validation for required fields (`title`, `description`, `dueDate`), status selection, and priority level.
- **Task Editing**: Inline/modal editing capability for updating task details, status progress, and deadlines.
- **Task Details View**: Modal drawer presenting full task metadata, formatted timestamps, unique ID, and action shortcuts.
- **Task Deletion**: Safe modal confirmation prior to API call with UI state synchronization.
- **Search & Filtering**: Real-time debounced title and description search, status filtering (`pending`, `in_progress`, `completed`), and priority filtering (`low`, `medium`, `high`).
- **Flexible Sorting**: Sort tasks by Created Date, Due Date, Priority, or Title in ascending or descending order.
- **Dark Mode**: Persisted dark/light theme toggling integrated with Tailwind CSS.
- **Error & Loading States**: Skeleton loading placeholders, toast notifications for user actions, and error fallbacks.

---

## 3. Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React Icons.
- **Backend**: Python 3.13, FastAPI, Pydantic v2, Uvicorn.
- **Testing**: Pytest, HTTPX, FastAPI TestClient.
- **Version Control**: Git, GitHub.
- **Documentation**: Swagger UI / OpenAPI 3.0.

---

## 4. Architecture

The application adopts a standard layered architecture with clear separation of responsibilities:

- **Frontend Architecture**:
  - `components/ui`: Atomic, reusable UI primitives (Button, Input, Select, Badge, Modal, Toast).
  - `components/tasks`: Feature-specific UI components for task presentation, filtering, and modal workflows.
  - `services/api.ts`: Centralized HTTP client encapsulating fetch requests, query serialization, and error parsing.
  - `hooks`: Custom React hooks (`useTasks`, `useDebounce`, `useDarkMode`) managing application state and UI logic.

- **Backend Architecture**:
  - `Routes` (`app/routes/task_routes.py`): Endpoint mapping and query parameter handling.
  - `Controllers` (`app/controllers/task_controller.py`): HTTP request orchestration and status code management.
  - `Services` (`app/services/task_service.py`): Business logic, filtering, searching, sorting, and data operations.
  - `Schemas` (`app/schemas/task_schema.py`): Pydantic request/response models and validation rules.
  - `Middleware` (`app/middleware/error_handler.py`): Centralized validation error handler converting RequestValidationError (422) to HTTP 400.
  - `Store` (`app/store.py`): Thread-safe in-memory Python task registry pre-seeded with realistic task items.

---

## 5. Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   │   └── task_controller.py
│   │   ├── middleware/
│   │   │   └── error_handler.py
│   │   ├── routes/
│   │   │   └── task_routes.py
│   │   ├── schemas/
│   │   │   └── task_schema.py
│   │   ├── services/
│   │   │   └── task_service.py
│   │   ├── main.py
│   │   └── store.py
│   ├── tests/
│   │   ├── conftest.py
│   │   └── test_tasks.py
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── tasks/
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskDeleteModal.tsx
│   │   │   ├── TaskDetailModal.tsx
│   │   │   ├── TaskFilterBar.tsx
│   │   │   ├── TaskFormModal.tsx
│   │   │   ├── TaskList.tsx
│   │   │   └── TaskStats.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── Select.tsx
│   │       └── Toast.tsx
│   ├── hooks/
│   │   ├── useDarkMode.ts
│   │   ├── useDebounce.ts
│   │   └── useTasks.ts
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── task.ts
│   ├── .env.example
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
├── README.md
└── .gitignore
```

---

## 6. API Endpoints

| Method | Endpoint | Description | Request Body | Response Status |
|---|---|---|---|---|
| `GET` | `/api/tasks` | Fetch list of tasks (supports `search`, `status`, `priority`, `sort_by`, `sort_order`) | None | `200 OK` |
| `GET` | `/api/tasks/{id}` | Fetch a single task by ID | None | `200 OK` / `404 Not Found` |
| `POST` | `/api/tasks` | Create a new task | Task object (`title`, `description`, `status`, `priority`, `dueDate`) | `201 Created` / `400 Bad Request` |
| `PUT` | `/api/tasks/{id}` | Update an existing task | Partial/Full task fields | `200 OK` / `400 Bad Request` / `404 Not Found` |
| `DELETE` | `/api/tasks/{id}` | Delete task by ID | None | `200 OK` / `404 Not Found` |

---

## 7. Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### Cloning Repository
```bash
git clone https://github.com/your-username/cleanomatics-assignment.git
cd cleanomatics-assignment
```

---

## 8. Environment Variables

### Backend (`backend/.env.example`)
```env
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=http://localhost:3000
```

### Frontend (`frontend/.env.example`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 9. Running Frontend

```bash
cd frontend
npm install
npm run dev
```
The Next.js web app will be available at `http://localhost:3000`.

To create a production build:
```bash
npm run build
npm run start
```

---

## 10. Running Backend

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
The FastAPI backend server will run at `http://localhost:8000`.

---

## 11. Running Tests

Execute the complete backend Pytest suite:

```bash
cd backend
python -m pytest tests
```

---

## 12. Swagger Documentation

FastAPI automatically generates interactive Swagger/OpenAPI documentation. When the backend server is running, access Swagger UI at:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 13. Screenshots Section

*(Place screenshot images here after local run)*
- **Dashboard Overview**: Light Mode & Dark Mode task cards and metrics.
- **Task Creation & Editing**: Form modal with validation state.
- **Task Filter & Search**: Live debounced search and multi-option filters.
- **Task Deletion Confirmation**: Confirmation dialog and toast feedback.

---

## 14. Design & Architecture Decisions

1. **Custom Error Middleware**: FastAPI defaults to HTTP 422 for RequestValidationError. To strictly meet assignment expectations, a custom exception handler transforms Pydantic validation errors into HTTP 400 responses with detailed error descriptions.
2. **Debounced Search**: Search input triggers a 300ms custom debounce hook (`useDebounce`) to avoid excessive API requests while typing.
3. **State Management**: React state hooks (`useTasks`) manage local component states, API triggers, and UI optimistic updates cleanly without requiring heavy external state libraries like Redux or Zustand.
4. **Pre-Seeded Data**: Pre-seeded with 5 realistic work tasks so the dashboard presents realistic content on first launch.

---

## 15. Limitations

- **In-Memory Storage**: Per the assignment specification, task records exist only within Python memory data structures. Restarting the backend server resets all task data to the initial pre-seeded state.
- **Single Workspace / User**: No multi-tenant authentication or database persistence is implemented, strictly adhering to assignment constraints.

---

## Requirement Traceability Matrix

| Assignment Requirement | Implementation | File / Location | Verified |
|---|---|---|---|
| Dashboard Display (Title, Description, Status, Priority, Created/Due Dates) | Rendered in TaskCard grid layout | [TaskCard.tsx](file:///c:/Users/Shivansh/Desktop/Assigment/frontend/components/tasks/TaskCard.tsx) | Yes |
| Dashboard Loading, Empty, and Error States | Rendered conditionally in TaskList | [TaskList.tsx](file:///c:/Users/Shivansh/Desktop/Assigment/frontend/components/tasks/TaskList.tsx) | Yes |
| Responsive Layout | Desktop grid / mobile responsive design | [page.tsx](file:///c:/Users/Shivansh/Desktop/Assigment/frontend/app/page.tsx) | Yes |
| Create Task Form & Validation | Modal with required field checks & feedback | [TaskFormModal.tsx](file:///c:/Users/Shivansh/Desktop/Assigment/frontend/components/tasks/TaskFormModal.tsx) | Yes |
| Edit Task Form | Modal pre-filled with existing task data | [TaskFormModal.tsx](file:///c:/Users/Shivansh/Desktop/Assigment/frontend/components/tasks/TaskFormModal.tsx) | Yes |
| Task Details View | Dedicated detail modal displaying complete info | [TaskDetailModal.tsx](file:///c:/Users/Shivansh/Desktop/Assigment/frontend/components/tasks/TaskDetailModal.tsx) | Yes |
| Delete Task with Confirmation | Confirmation dialog & API integration | [TaskDeleteModal.tsx](file:///c:/Users/Shivansh/Desktop/Assigment/frontend/components/tasks/TaskDeleteModal.tsx) | Yes |
| In-Memory Backend Store | Python dictionary store | [store.py](file:///c:/Users/Shivansh/Desktop/Assigment/backend/app/store.py) | Yes |
| REST API Endpoints (GET, POST, PUT, DELETE) | FastAPI APIRouter endpoints | [task_routes.py](file:///c:/Users/Shivansh/Desktop/Assigment/backend/app/routes/task_routes.py) | Yes |
| HTTP Status Codes (200, 201, 400, 404, 500) | Controller & Error Handler status mapping | [error_handler.py](file:///c:/Users/Shivansh/Desktop/Assigment/backend/app/middleware/error_handler.py) | Yes |
| Pydantic Validation & Custom HTTP 400 Handler | RequestValidationError handler converting 422 to 400 | [error_handler.py](file:///c:/Users/Shivansh/Desktop/Assigment/backend/app/middleware/error_handler.py) | Yes |
| Backend Architecture (Routes/Controllers/Services/Store) | Modular directory architecture | `backend/app/` | Yes |
| Frontend Architecture (Components/Services/Hooks) | Modular React/Next.js architecture | `frontend/` | Yes |
| Search by Title/Description (Debounced) | Custom `useDebounce` hook & backend service search | [useDebounce.ts](file:///c:/Users/Shivansh/Desktop/Assigment/frontend/hooks/useDebounce.ts) | Yes |
| Filter by Status & Priority | Multi-option select filters | [TaskFilterBar.tsx](file:///c:/Users/Shivansh/Desktop/Assigment/frontend/components/tasks/TaskFilterBar.tsx) | Yes |
| Multi-field Sorting | Created date, due date, priority, title sorting | [task_service.py](file:///c:/Users/Shivansh/Desktop/Assigment/backend/app/services/task_service.py) | Yes |
| Dark Mode Support | Tailwind class dark mode toggle & persistence | [useDarkMode.ts](file:///c:/Users/Shivansh/Desktop/Assigment/frontend/hooks/useDarkMode.ts) | Yes |
| Pytest Test Suite | 13 backend unit tests covering all required scenarios | [test_tasks.py](file:///c:/Users/Shivansh/Desktop/Assigment/backend/tests/test_tasks.py) | Yes |
| Swagger/OpenAPI Documentation | Auto-generated FastAPI docs | [main.py](file:///c:/Users/Shivansh/Desktop/Assigment/backend/app/main.py) | Yes |
| Zero Comments Constraint | 100% comment-free codebase verified | Complete Repository | Yes |
