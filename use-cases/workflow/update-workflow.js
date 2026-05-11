class UpdateWorkflow {
  constructor(workflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  async execute({ workflowId, userId, title, description }) {

    if (!workflowId) {
      throw new Error("workflowId is required");
    }

    if (!userId) {
      throw new Error("userId is required");
    }

    if (!title || typeof title !== "string") {
      throw new Error("valid title is required");
    }

    const updatedWorkflow =
      await this.workflowRepository.updateByIdAndUser({
        workflowId,
        userId,
        title,
        description
      });

    if (!updatedWorkflow) {
      throw new Error("Workflow not found");
    }

    return updatedWorkflow;
  }
}

module.exports = UpdateWorkflow;
