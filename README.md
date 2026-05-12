# Workflow Management API
A scalable and production-ready Workflow & Task Management REST API built with Node.js, Express, Docker, and PostgreSQL using Clean Architecture and Domain-Driven Design principles.

The project focuses on maintainability, separation of concerns, security, and modular application structure.

# Features
* JWT Authentication
* User Registration & Login
* Workflow Management
* Task Management
* Task Status Tracking
* Ownership-based Access Control
* PostgreSQL Integration
* Dockerized PostgreSQL Setup
* Clean Architecture
* Modular Use Cases
* Repository Pattern
* Input Validation
* RESTful API Design

# Tech Stack
* Node.js
* Express.js
* PostgreSQL
* Docker
* JWT Authentication
* bcrypt
* Clean Architecture
* Domain-Driven Design (DDD)

# Database Schema
Users
````
users
- id
- full_name
- email
- password_hash
- created_at
````

Workflows
````
workflows
- id
- user_id
- title
- description
- created_at
- updated_at

````

Tasks
````
tasks
- id
- workflow_id
- title
- description
- priority
- status
- due_date
- completed_at
- created_at
- updated_at
````

# Authentication
Authentication is handled using JWT tokens.

Protected routes require:
````
Authorization: Bearer <token>
````

# API Endpoints
Auth:

Register User
````
POST /users
````
Body
````
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "12345678"
}
````

Login
````
POST /auth/login
````
Body
````
{
  "email": "john@example.com",
  "password": "12345678"
}
````


Workflows:

Create Workflow
````
POST /workflows
````

Get My Workflows
````
GET /workflows/me
````

Get Workflow Detail
````
GET /workflows/:id
````

Update Workflow
````
PUT /workflows/:id
````

Delete Workflow
````
DELETE /workflows/:id
````

Tasks:

Create Task
````
POST /workflows/:workflowId/tasks
````

Get Workflow Tasks
````
GET /workflows/:workflowId/tasks
````

Query Params
````                                                                   
?status=PENDING&page=1&limit=10
````

Get Single Task
````
GET /workflows/:workflowId/tasks/:taskId
````

Update Task
````
PUT /workflows/:workflowId/tasks/:taskId
````

Update Task Status
````
PATCH /workflows/:workflowId/tasks/:taskId
````
Body
````
{
  "status": "COMPLETED"
}
````

Delete Task
````
DELETE /workflows/:workflowId/tasks/:taskId
````


# Installation

Clone Repository
````
git clone <your-repository-url>
cd workflow-management-api
````

Install Dependencies
````
npm install
````

# Run DataBase by docker
````
cd deployment
docker compose up -d
````

# Run Database Migration
````
node database/migrate.js
````

# Start Development Server
````
node app.js
````

# Architecture

This project follows Clean Architecture principles:

* Domain layer contains business entities and rules
* Application layer contains use cases
* Infrastructure layer handles PostgreSQL and external services
* Interface layer manages HTTP requests and responses

Benefits:

* Scalable codebase
* Easier testing
* Better maintainability
* Framework-independent business logic
* Clear separation of concerns


# Security

* Password hashing using bcrypt
* JWT authentication
* Protected routes
* Ownership validation for workflows and tasks
* Input validation across use cases

# Future Improvements

* Refresh Tokens
* Role-Based Access Control (RBAC)
* Swagger Documentation
* Unit & Integration Tests
* Docker Support
* Rate Limiting
* Task Comments
* Activity Logs
* File Attachments
* Real-time Notifications

# License
MIT

