// controller/task-controller.js

const CreateTask = require("../use-cases/task/create-task")
const ListTasks = require("../use-cases/task/task-find-by-workflow-id")


const TaskRepository = require("../repository/postgre/task-repository")
const WorkflowRepository = require("../repository/postgre/workflow-repository")

const taskRepository = new TaskRepository()
const workflowRepository = new WorkflowRepository()

const createTaskUseCase = new CreateTask({
  taskRepository,
  workflowRepository
})

const listTaskUseCase = new ListTasks({
  taskRepository,
  workflowRepository
})

module.exports = {

  async create(req, res) {
    try {

      const workflowId = Number(req.params.workflowId)
      const userId = req.user.userId

      if (Number.isNaN(workflowId)) {
        return res.status(400).json({ error: "invalid workflow id" })
      }

      const { title, description, priority, status, dueDate } = req.body

      const task = await createTaskUseCase.execute({
        userId,
        workflowId,
        title,
        description,
        priority,
        status,
        dueDate
      })

      return res.status(201).json(task)

    } catch (error) {

      if (error.message === "workflow not found or access denied") {
        return res.status(404).json({ error: error.message })
      }

      if (
        error.message.includes("title") ||
        error.message.includes("workflowId")
      ) {
        return res.status(400).json({ error: error.message })
      }

      return res.status(500).json({ error: error.message })
    }
  },

    async listByWorkflow(req, res) {
    try {
      const workflowId = Number(req.params.workflowId);
      const userId = req.user.userId;
      const { status, page, limit } = req.query;

      if (Number.isNaN(workflowId)) {
        return res.status(400).json({ error: "invalid workflow id" });
      }

      const tasks = await listTaskUseCase.execute({
        workflowId,
        userId,
        status,
        page,
        limit
      });

      return res.status(200).json(tasks);

    } catch (error) {
      if (
        error.message === "Workflow not found" ||
        error.message === "Access denied"
      ) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  }

}
