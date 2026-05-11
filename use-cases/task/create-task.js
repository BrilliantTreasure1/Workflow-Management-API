// use-cases/task/task-create.js

const Task = require("../../entities/task/Task")
const TaskPriority = require("../../entities/task/TaskPriority")
const TaskStatus = require("../../entities/task/TaskStatus")

class CreateTask {
  constructor({ taskRepository, workflowRepository }) {
    this.taskRepository = taskRepository
    this.workflowRepository = workflowRepository
  }

  async execute({ userId, workflowId, title, description, priority, status, dueDate }) {

    if (!userId || typeof userId !== "number") {
      throw new Error("userId must be a number")
    }

    if (!workflowId || typeof workflowId !== "number") {
      throw new Error("workflowId must be a number")
    }

    if (!title || typeof title !== "string") {
      throw new Error("title is required")
    }

    // Security check
    const workflow = await this.workflowRepository.findByIdAndUser(workflowId, userId)

    if (!workflow) {
      throw new Error("workflow not found or access denied")
    }

    const task = new Task({
      workflowId,
      title,
      description: description || null,
      priority: priority || TaskPriority.MEDIUM,
      status: status || TaskStatus.PENDING,
      dueDate: dueDate || null
    })

    const savedTask = await this.taskRepository.create(task)

    return savedTask
  }
}

module.exports = CreateTask
