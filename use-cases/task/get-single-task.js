class GetSingleTask {
  constructor({ taskRepository, workflowRepository }) {
    this.taskRepository = taskRepository;
    this.workflowRepository = workflowRepository;
  }

  async execute({ workflowId, taskId, userId }) {

    workflowId = Number(workflowId);
    taskId = Number(taskId);
    userId = Number(userId);

    if (
      Number.isNaN(workflowId) ||
      Number.isNaN(taskId) ||
      Number.isNaN(userId)
    ) {
      throw new Error("workflowId, taskId and userId are required");
    }

    const workflow = await this.workflowRepository.findByIdAndUser(
      workflowId,
      userId
    );

    if (!workflow) {
      throw new Error("Workflow not found");
    }

    const task = await this.taskRepository.findById(taskId);

    if (!task || task.workflowId !== workflowId) {
      throw new Error("Task not found");
    }

    return task;
  }
}

module.exports = GetSingleTask;
