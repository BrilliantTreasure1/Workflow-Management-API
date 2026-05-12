class DeleteTask {
  constructor({ taskRepository, workflowRepository }) {
    this.taskRepository = taskRepository
    this.workflowRepository = workflowRepository
  }

  async execute({ taskId, workflowId, userId }) {
    taskId = Number(taskId)
    workflowId = Number(workflowId)
    userId = Number(userId)

    if ([taskId, workflowId, userId].some(Number.isNaN)) {
      throw new Error("Invalid IDs provided")
    }

    const workflow = await this.workflowRepository.findByIdAndUser(
      workflowId,
      userId
    )

    if (!workflow) {
      throw new Error("Workflow not found or access denied")
    }

    const existingTask = await this.taskRepository.findById(taskId)

    if (!existingTask || existingTask.workflowId !== workflowId) {
      throw new Error("Task not found in this workflow")
    }

    await this.taskRepository.deleteTask(taskId)

    return {
      message: "Task deleted successfully"
    }
  }
}

module.exports = DeleteTask
