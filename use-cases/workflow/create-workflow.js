// use-cases/workflow/create-workflow.js
const Workflow = require("../../entities/workflow/Workflow");

class CreateWorkflow {
  constructor(workflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  async execute({ userId, title, description }) {

    const workflow = new Workflow({
      userId,
      title,
      description
    });

    const savedWorkflow = await this.workflowRepository.create(workflow);

    return savedWorkflow;
  }
}

module.exports = CreateWorkflow;
