const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const taskRouter = require('./routes/tasks');
app.use('/tasks', taskRouter);

app.get('/health', (req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
