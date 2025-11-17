# Task Management API (Lab 01)

## Requirements
- Node.js (LTS)
- npm
- Postman (optional)

## Setup
1. Clone repo:
   ```bash
   git clone <https://github.com/ProtikDas369/web-dev-3-2-.git>
   cd task-management


Install Dependencies

Run:

npm install


This installs:

express

nodemon (dev)

Run the Server
 Development mode (auto-restart):
npm run dev

 Normal start:
npm start


Server runs at:

http://localhost:3000


You should see:

Server running at http://localhost:3000

 API Endpoints
1. GET /

Description: Check if API is running
URL:

http://localhost:3000/


Response:

Task Management API is running!

2. GET /health

Description: Health check of the server

http://localhost:3000/health


Response Example:

{
  "status": "healthy",
  "uptime": 32.142
}

3. GET /tasks

Description: Returns all tasks

http://localhost:3000/tasks


Response Example:

{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Learn Node.js",
      "completed": false,
      "priority": "high",
      "createdAt": "2024-01-20T10:00:00.000Z"
    }
  ]
}

4. POST /tasks

Description: Create a new task

URL:

http://localhost:3000/tasks


Headers:

Content-Type: application/json


Body Example:

{
  "title": "Learn REST APIs",
  "priority": "medium"
}


Success Response (201):

{
  "success": true,
  "task": {
    "id": 6,
    "title": "Learn REST APIs",
    "completed": false,
    "priority": "medium",
    "createdAt": "2024-01-20T12:00:00.000Z"
  }
}

5. GET /tasks/:id

Description: Get a single task by ID

Example:

http://localhost:3000/tasks/1


Success Response:

{
  "id": 1,
  "title": "Learn Node.js",
  "completed": false,
  "priority": "high",
  "createdAt": "2024-01-20T10:00:00.000Z"
}


Errors:

Invalid ID:

{ "error": "Invalid ID format" }


Not found:

{ "error": "Task not found" }

 Project Structure
task-management/
│── package.json
│── README.md
│── src/
│    ├── index.js
│    └── routes/
│         └── tasks.js

 Git Commands Used
git init
git add .
git commit -m "Lab 02 completed"
git branch features/routes
git checkout features/routes
git push -u origin features/routes

 Author

Protik Das
Jahangirnagar University
CSE 362 — Web Programming II LAB