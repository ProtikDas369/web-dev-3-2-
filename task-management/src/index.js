const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// built-in middleware to parse JSON if needed later
app.use(express.json());

// mount tasks router
const tasksRouter = require('./routes/tasks');
app.use('/', tasksRouter);

// health route (explicit here, but tasksRouter will also register it)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

