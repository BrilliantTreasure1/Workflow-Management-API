class DeleteWorkflow {
  constructor(workflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  async execute({ workflowId, userId }) {

    if (!workflowId) {
      throw new Error("workflowId is required");
    }

    if (!userId) {
      throw new Error("userId is required");
    }

    const deleted =
      await this.workflowRepository.deleteByIdAndUser({
        workflowId,
        userId
      });

    if (!deleted) {
      throw new Error("Workflow not found");
    }

    return true;
  }
}

module.exports = DeleteWorkflow;
