class FindWorkflowsByUser {
  constructor(workflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  async execute({ userId }) {
    const normalizedUserId = Number(userId);

    if (!Number.isInteger(normalizedUserId) || normalizedUserId <= 0) {
      throw new Error("valid userId is required");
    }

    const workflows = await this.workflowRepository.findByUserId(normalizedUserId);

    return workflows;
  }
}

module.exports = FindWorkflowsByUser;
