class FindTasksByWorkflowId {
  constructor({taskRepository, workflowRepository}) {
    this.taskRepository = taskRepository;
    this.workflowRepository = workflowRepository;
  }

  async execute({ workflowId, userId, status, page = 1, limit = 10 }) {

    workflowId = Number(workflowId);
    userId = Number(userId);
    page = Number(page);
    limit = Number(limit);

    if (!workflowId || !userId) {
      throw new Error("workflowId and userId are required");
    }

    const workflow = await this.workflowRepository.findByIdAndUser(workflowId , userId);

    if (!workflow) {
      throw new Error("Workflow not found");
    }


    return this.taskRepository.findByWorkflowId({
      workflowId,
      status,
      page,
      limit
    });
  }
}

module.exports = FindTasksByWorkflowId;
