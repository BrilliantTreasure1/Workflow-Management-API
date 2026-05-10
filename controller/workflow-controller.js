// controllers/workflow-controller.js

const CreateWorkflow = require("../use-cases/workflow/create-workflow");
const WorkflowRepository = require("../repository/postgre/workflow-repository");

const workflowRepository = new WorkflowRepository();
const createWorkflowUseCase = new CreateWorkflow(workflowRepository);

module.exports = {

  async create(req, res) {
    try {

      const userId = req.user.userId

      if (!userId || isNaN(userId)) {
        return res.status(400).json({ error: "invalid user id" });
      }

      const { title, description } = req.body;

      const workflow = await createWorkflowUseCase.execute({
        userId,
        title,
        description
      });

      return res.status(201).json(workflow);

    } catch (error) {

      return res.status(500).json({ error: error.message });

    }
  }

};
