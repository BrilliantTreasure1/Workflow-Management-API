// repositories/workflow/workflow-repository.js

const pool = require("../../config/db");
const Workflow = require("../../entities/workflow/Workflow");

class WorkflowRepositoryPostgres {

  async create(workflow) {

    const query = `
      INSERT INTO workflows (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING id, user_id, title, description, created_at, updated_at
    `;

    const values = [
      workflow.userId,
      workflow.title,
      workflow.description
    ];

    const result = await pool.query(query, values);

    const row = result.rows[0];

    return new Workflow({
      id: row.id,
      userId: row.user_id,
      title: row.title,
      description: row.description,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  }

  async findByUserId(userId) {

    const query = `
      SELECT id, user_id, title, description, created_at, updated_at
      FROM workflows
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query, [userId]);

    return result.rows.map(row =>
      new Workflow({
        id: row.id,
        userId: row.user_id,
        title: row.title,
        description: row.description,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      })
    );
  }


async findByIdAndUser(id, userId) {
  const query = `
    SELECT id, user_id, title, description, created_at, updated_at
    FROM workflows
    WHERE id = $1 AND user_id = $2
  `;

  const result = await pool.query(query, [id, userId]);

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return new Workflow({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
}

async updateByIdAndUser({
  workflowId,
  userId,
  title,
  description
}) {

  const query = `
    UPDATE workflows
    SET
      title = $1,
      description = $2,
      updated_at = NOW()
    WHERE id = $3
      AND user_id = $4
    RETURNING id, user_id, title, description, created_at, updated_at
  `;

  const values = [
    title,
    description,
    workflowId,
    userId
  ];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];

  return new Workflow({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
}


}

module.exports = WorkflowRepositoryPostgres;
