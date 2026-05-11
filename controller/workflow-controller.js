// controllers/workflow-controller.js

const CreateWorkflow = require("../use-cases/workflow/create-workflow");
const FindWorkflowsByUser = require("../use-cases/workflow/find-workflow-by-user")
const FindWorkflowById = require("../use-cases/workflow/get-workflow-detail")
const DeleteWorkflow = require("../use-cases/workflow/delete-workflow")
const UpdateWorkflow = require("../use-cases/workflow/update-workflow")



const WorkflowRepository = require("../repository/postgre/workflow-repository");

const workflowRepository = new WorkflowRepository();
const createWorkflowUseCase = new CreateWorkflow(workflowRepository);
const findWorkflowsByUserUseCase = new FindWorkflowsByUser(workflowRepository)
const getWorkflowDetailUseCase = new FindWorkflowById(workflowRepository)
const deleteWorkflowUseCase = new DeleteWorkflow(workflowRepository)
const updateWorkflowUseCase = new UpdateWorkflow(workflowRepository)




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
  },

  async findByUser(req, res) {
  try {
    const userId = req.user.userId;

    const workflows = await findWorkflowsByUserUseCase.execute({ userId });

    return res.status(200).json(workflows);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
},

async findById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.userId; 

    const workflow = await getWorkflowDetailUseCase.execute({ 
      workflowId: id, 
      userId 
    });

    return res.status(200).json(workflow);
  } catch (error) {
    if (error.message === "Workflow not found") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
},

async update(req, res) {
  try {

    const { id } = req.params;

    const userId = req.user.userId;

    const {
      title,
      description
    } = req.body;

    const workflow =
      await updateWorkflowUseCase.execute({
        workflowId: id,
        userId,
        title,
        description
      });

    return res.status(200).json(workflow);

  } catch (error) {

    if (error.message === "Workflow not found") {
      return res.status(404).json({
        error: error.message
      });
    }

    return res.status(400).json({
      error: error.message
    });
  }
},

async delete(req, res) {
  try {

    const { id } = req.params;

    const userId = req.user.userId;

    await deleteWorkflowUseCase.execute({
      workflowId: id,
      userId
    });

    return res.status(204).send();

  } catch (error) {

    if (error.message === "Workflow not found") {
      return res.status(404).json({
        error: error.message
      });
    }

    return res.status(400).json({
      error: error.message
    });
  }
}


};
