const pool = require("../../config/db");
const Task = require("../../entities/task/Task");

class TaskRepositoryPostgres {

  async create(task) {

    const query = `
      INSERT INTO tasks (
        workflow_id,
        title,
        description,
        priority,
        status,
        due_date,
        created_at,
        updated_at,
        completed_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING
        id,
        workflow_id,
        title,
        description,
        priority,
        status,
        due_date,
        created_at,
        updated_at,
        completed_at
    `;

    const values = [
      task.workflowId,
      task.title,
      task.description || null,
      task.priority,
      task.status,
      task.dueDate ? new Date(task.dueDate) : null,
      task.createdAt,
      task.updatedAt || null,
      task.completedAt || null
    ];

    const result = await pool.query(query, values);

    if (!result.rows.length) {
      throw new Error("Failed to create task");
    }

    const row = result.rows[0];

    return new Task({
      id: row.id,
      workflowId: row.workflow_id,
      title: row.title,
      description: row.description,
      priority: row.priority,
      status: row.status,
      dueDate: row.due_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at
    });
  }

  async findByWorkflowId({
  workflowId,
  status,
  page = 1,
  limit = 10
}) {

  const offset = (page - 1) * limit;

  let query = `
    SELECT
      id,
      workflow_id,
      title,
      description,
      priority,
      status,
      due_date,
      created_at,
      updated_at,
      completed_at
    FROM tasks
    WHERE workflow_id = $1
  `;

  const values = [workflowId];

  // optional status filter
  if (status) {
    values.push(status.toUpperCase());

    query += `
      AND status = $${values.length}
    `;
  }

  values.push(limit);

  query += `
    ORDER BY created_at DESC
    LIMIT $${values.length}
  `;

  values.push(offset);

  query += `
    OFFSET $${values.length}
  `;

  const result = await pool.query(query, values);

  return result.rows.map((row) => {
    return new Task({
      id: row.id,
      workflowId: row.workflow_id,
      title: row.title,
      description: row.description,
      priority: row.priority,
      status: row.status,
      dueDate: row.due_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at
    });
  });
}


}

module.exports = TaskRepositoryPostgres;
