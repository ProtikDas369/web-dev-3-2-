const db = require('./src/config/db');

async function seedTasks() {
  try {
    // Check if tasks already exist
    const [rows] = await db.query('SELECT COUNT(*) as count FROM tasks');
    if (rows[0].count > 0) {
      console.log('Tasks already seeded. Exiting...');
      process.exit(0);
    }

    const tasks = [
      { title: 'Learn Node.js', description: 'Follow tutorials', status: 'pending' },
      { title: 'Build REST API', description: 'Implement CRUD', status: 'in-progress' },
      { title: 'Study Express Router', description: 'Understand routing', status: 'pending' },
      { title: 'Finish Lab Assignment', description: 'Complete LAB 3', status: 'pending' },
      { title: 'Prepare Postman Tests', description: 'Test all endpoints', status: 'pending' },
      { title: 'Practice SQL', description: 'Write queries', status: 'pending' },
      { title: 'Write Lab Report', description: 'Compare in-memory vs SQL', status: 'pending' },
      { title: 'Implement Pagination', description: 'GET /tasks?page=..&limit=..', status: 'pending' },
      { title: 'Search Tasks', description: 'Add ?q= search', status: 'pending' },
      { title: 'Soft Delete Tasks', description: 'Test deleted_at column', status: 'pending' },
      { title: 'Restore Tasks', description: 'Use PUT /tasks/:id/restore', status: 'pending' },
      { title: 'Add Winston Logging', description: 'Log database errors', status: 'pending' },
      { title: 'Deploy App', description: 'Run in production', status: 'pending' },
      { title: 'Prepare Presentation', description: 'Screenshots + demo', status: 'pending' },
      { title: 'Submit Assignment', description: 'Upload to LMS', status: 'pending' }
    ];

    for (const task of tasks) {
      await db.query(
        'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
        [task.title, task.description, task.status]
      );
    }

    console.log('Seeding completed successfully!');
    process.exit(0);

  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

// Run the seeding function
seedTasks();
