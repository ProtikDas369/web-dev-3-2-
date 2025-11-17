const express = require('express');
const router = express.Router();

// GET all tasks
router.get('/', (req, res) => {
  const tasks = req.app.locals.tasks;
  res.status(200).json({
    success: true,
    data: tasks
  });
});

// POST create new task
router.post('/', (req, res) => {
  try {
    const { title, priority } = req.body;

    // validation
    if (!title || !priority) {
      return res.status(400).json({
        success: false,
        error: "Title and priority are required"
      });
    }

    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        error: "Invalid priority. Use low, medium, or high"
      });
    }

    const tasks = req.app.locals.tasks;  // FIXED: tasks must come from app.locals

    const newTask = {
      id: tasks.length + 1,
      title,
      completed: false,
      priority,
      createdAt: new Date()
    };

    tasks.push(newTask);

    return res.status(201).json({
      success: true,
      data: newTask
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// GET task by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const tasks = req.app.locals.tasks;
  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
});

module.exports = router;
