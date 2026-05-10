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

}

module.exports = WorkflowRepositoryPostgres;
