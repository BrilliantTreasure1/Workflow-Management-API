const Task = require("../../entities/task/Task")

class UpdateTask {

  constructor({ taskRepository, workflowRepository }) {
    this.taskRepository = taskRepository
    this.workflowRepository = workflowRepository
  }

  async execute({ taskId, workflowId, userId, title, description, status, priority, dueDate }) {

    taskId = Number(taskId)
    workflowId = Number(workflowId)
    userId = Number(userId)

    if (Number.isNaN(taskId) || Number.isNaN(workflowId) || Number.isNaN(userId)) {
      throw new Error("Invalid IDs provided")
    }

    const workflow = await this.workflowRepository.findByIdAndUser(workflowId, userId)

    if (!workflow) {
      throw new Error("Workflow not found or access denied")
    }

    const normalizedStatus = status ? status.toUpperCase() : null;

    const existingTask = await this.taskRepository.findById(taskId)

    if (!existingTask || existingTask.workflowId !== workflowId) {
      throw new Error("Task not found in this workflow")
    }

    let completedAt = existingTask.completedAt

    if (normalizedStatus === "COMPLETED" && existingTask.status !== "COMPLETED") {
      completedAt = new Date()
    }

    if (
      normalizedStatus !== "COMPLETED" &&
      existingTask.status === "COMPLETED"
    ) {
      completedAt = null
    }

    const updatedEntity = new Task({
      id: existingTask.id,
      workflowId: existingTask.workflowId,
      title: title ?? existingTask.title,
      description: description ?? existingTask.description,
      status: status ?? existingTask.status,
      priority: priority ?? existingTask.priority,
      dueDate: dueDate ?? existingTask.dueDate,
      createdAt: existingTask.createdAt,
      updatedAt: new Date(),
      completedAt: completedAt
    })

    return await this.taskRepository.update(taskId,updatedEntity)
  }
}

module.exports = UpdateTask
