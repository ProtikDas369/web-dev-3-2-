const logger = require('../config/logger');



const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ====================
// GET ALL TASKS (Pagination + Search, exclude soft-deleted)
// ====================
router.get('/', async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    if (limit > 50) limit = 50;
    if (page < 1) page = 1;
    const offset = (page - 1) * limit;

    const search = req.query.q ? `%${req.query.q}%` : null;

    let totalQuery = 'SELECT COUNT(*) as total FROM tasks WHERE deleted_at IS NULL';
    let dataQuery = 'SELECT * FROM tasks WHERE deleted_at IS NULL';
    let params = [];

    if (search) {
      totalQuery += ' AND title LIKE ?';
      dataQuery += ' AND title LIKE ?';
      params.push(search);
    }

    const [countResult] = await db.query(totalQuery, params);
    const totalTasks = countResult[0].total;
    const totalPages = Math.ceil(totalTasks / limit);

    dataQuery += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await db.query(dataQuery, params);

    res.json({
      totalTasks,
      totalPages,
      currentPage: page,
      limit,
      data: rows
    });

  } catch (err) {
    logger.error(err.stack || err);;
    res.status(500).json({ error: 'Database error' });
  }
});

// ====================
// GET DELETED TASKS
// ====================
router.get('/deleted', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC');
    res.json(rows);
  } catch (err) {
    logger.error(err.stack || err);;
    res.status(500).json({ error: 'Database error' });
  }
});

// ====================
// CREATE TASK
// ====================
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const sql = "INSERT INTO tasks (title, description) VALUES (?, ?)";
    const [result] = await db.query(sql, [title, description || null]);

    const [newTask] = await db.query("SELECT * FROM tasks WHERE id = ?", [
      result.insertId,
    ]);

    res.status(201).json(newTask[0]);
  } catch (err) {
    logger.error(err.stack || err);;
    res.status(500).json({ error: "Failed to create task" });
  }
});

// ====================
// GET BY ID
// ====================
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ? AND deleted_at IS NULL", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// ====================
// UPDATE TASK
// ====================
router.put('/:id', async (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;

  try {
    const updates = [];
    const values = [];

    if (title !== undefined) { updates.push("title = ?"); values.push(title); }
    if (description !== undefined) { updates.push("description = ?"); values.push(description); }
    if (status !== undefined) { updates.push("status = ?"); values.push(status); }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id);

    const sql = `UPDATE tasks SET ${updates.join(", ")} WHERE id = ? AND deleted_at IS NULL`;
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found or deleted" });
    }

    const [updated] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    res.json(updated[0]);

  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ====================
// SOFT DELETE TASK
// ====================
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE tasks SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found or already deleted" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// ====================
// RESTORE SOFT-DELETED TASK
// ====================
router.put('/:id/restore', async (req, res) => {
  try {
    const [result] = await db.query(
      "UPDATE tasks SET deleted_at = NULL WHERE id = ? AND deleted_at IS NOT NULL",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found or not deleted" });
    }

    const [restored] = await db.query("SELECT * FROM tasks WHERE id = ?", [req.params.id]);
    res.json(restored[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to restore task" });
  }
});

module.exports = router;
