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

  async findById(taskId) {

    const query = `
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
      WHERE id = $1
    `;

    const values = [taskId];

    const result = await pool.query(query, values);

    if (!result.rows.length) {
      return null;
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

   async update(taskId, updatedTask) {

    const query = `
      UPDATE tasks
      SET
        title = $1,
        description = $2,
        status = $3,
        priority = $4,
        due_date = $5,
        updated_at = $6,
        completed_at = $7
      WHERE id = $8
      RETURNING *
    `

    const values = [
      updatedTask.title,
      updatedTask.description,
      updatedTask.status,
      updatedTask.priority,
      updatedTask.dueDate,
      updatedTask.updatedAt,
      updatedTask.completedAt,
      taskId
    ]

    const result = await pool.query(query, values)

    if (result.rows.length === 0) {
      return null
    }

    const row = result.rows[0]

    return new Task({
      id: row.id,
      workflowId: row.workflow_id,
      title: row.title,
      description: row.description,
      status: row.status,
      priority: row.priority,
      dueDate: row.due_date,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at
    })
  }

  async updateStatus({taskId , status , completedAt}){
    const query = `
      UPDATE tasks
      SET
        status = $1,
        completed_at = $2,
        updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `;

     const values = [status, completedAt, taskId];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;

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

  async deleteTask(taskId) {
  const query = `
    DELETE FROM tasks
    WHERE id = $1
    RETURNING id
  `

  const result = await pool.query(query, [taskId])

  return result.rows[0] || null
}



}

module.exports = TaskRepositoryPostgres;
