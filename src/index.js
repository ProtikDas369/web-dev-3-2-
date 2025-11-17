const express = require('express');
const taskRouter = require('./routes/tasks');

const app = express();
const port = 3000;

// In-memory storage
const tasks = [
  { id: 1, title: "Learn Node.js", completed: false, priority: "high", createdAt: new Date() },
  { id: 2, title: "Build REST API", completed: false, priority: "medium", createdAt: new Date() },
  { id: 3, title: "Study Express Router", completed: false, priority: "low", createdAt: new Date() },
  { id: 4, title: "Finish Lab Assignment", completed: false, priority: "high", createdAt: new Date() },
  { id: 5, title: "Prepare Postman Tests", completed: false, priority: "medium", createdAt: new Date() }
];

// Make tasks available in routes
app.locals.tasks = tasks;

// JSON body parser
app.use(express.json());

// Mount router
app.use('/tasks', taskRouter);

// Health route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime()
  });
});

// Root route
app.get('/', (req, res) => {
  res.send("Task Management API is running!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
