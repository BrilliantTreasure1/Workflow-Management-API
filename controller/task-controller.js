// controller/task-controller.js

const CreateTask = require("../use-cases/task/create-task")
const ListTasks = require("../use-cases/task/task-find-by-workflow-id")
const GetSingleTasks = require("../use-cases/task/get-single-task")
const UpdateTasks = require("../use-cases/task/update-task")




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

const getSingleTaskUseCase = new GetSingleTasks({
  taskRepository,
  workflowRepository
})

const updateTaskUseCase = new UpdateTasks({
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
  },

  async getSingle(req, res) {
  try {

    const workflowId = req.params.workflowId;
    const taskId = req.params.taskId;
    const userId = req.user.userId;

    const task = await getSingleTaskUseCase.execute({
      workflowId,
      taskId,
      userId
    });

    res.status(200).json(task);

  } catch (error) {

    if (error.message === "Workflow not found") {
      return res.status(404).json({ error: error.message });
    }

    if (error.message === "Task not found") {
      return res.status(404).json({ error: error.message });
    }

    res.status(400).json({ error: error.message });
  }
},

  async update(req, res) {
    try {

      const workflowId = req.params.workflowId
      const taskId = req.params.taskId
      const userId = req.user.userId

      const {
        title,
        description,
        status,
        priority,
        dueDate
      } = req.body

      const updatedTask = await updateTaskUseCase.execute({
        taskId,
        workflowId,
        userId,
        title,
        description,
        status,
        priority,
        dueDate
      })

      return res.status(200).json(updatedTask)

    } catch (error) {

      if (
        error.message === "Workflow not found or access denied" ||
        error.message === "Task not found in this workflow"
      ) {
        return res.status(404).json({
          error: error.message
        })
      }

      if (
        error.message === "Invalid IDs provided"
      ) {
        return res.status(400).json({
          error: error.message
        })
      }

      return res.status(500).json({
        error: error.message
      })
    }
  }


}
