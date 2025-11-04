const express = require('express');
const router = express.Router();

// Sample tasks array (5 tasks) with id, title, completed, priority, createdAt (Date)
const tasks = [
  { id: 1, title: 'Learn Node.js', completed: false, priority: 'high',   createdAt: new Date() },
  { id: 2, title: 'Build REST API', completed: false, priority: 'high',   createdAt: new Date() },
  { id: 3, title: 'Write README',   completed: false, priority: 'medium', createdAt: new Date() },
  { id: 4, title: 'Test endpoints', completed: false, priority: 'medium', createdAt: new Date() },
  { id: 5, title: 'Push to Git',    completed: false, priority: 'low',    createdAt: new Date() }
];

// Root route
router.get('/', (req, res) => {
  res.send('Task Management API is running!');
});

// GET /tasks - returns tasks
router.get('/tasks', (req, res) => {
  // when sending JSON, Date objects are converted to ISO strings
  res.json(tasks);
});

// GET /task/:id - returns a single task by id
router.get('/task/:id', (req, res) => {
  const idParam = req.params.id;

  // Validate ID format (must be a positive integer)
  const id = parseInt(idParam, 10);
  if (isNaN(id) || id.toString() !== idParam || id < 1) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
});

module.exports = router;
