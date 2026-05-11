// use-cases/workflow/get-workflow-detail.js

class GetWorkflowDetail {
  constructor(workflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  async execute({ workflowId, userId }) {
    if (!workflowId || !userId) {
      throw new Error("Missing parameters");
    }

    const workflow = await this.workflowRepository.findByIdAndUser(workflowId, userId);

    if (!workflow) {
      throw new Error("Workflow not found");
    }

    return workflow;
  }
}

module.exports = GetWorkflowDetail;
