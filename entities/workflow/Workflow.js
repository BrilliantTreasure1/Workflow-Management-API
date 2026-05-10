class Workflow {
  constructor({
    id = null,
    userId,
    title,
    description = null,
    createdAt = new Date(),
    updatedAt = null,
    tasks = []
  }) {
    if (!userId) throw new Error("Workflow must have userId");
    if (!title) throw new Error("Workflow must have title");

    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;

    this.createdAt = new Date(createdAt);
    this.updatedAt = updatedAt ? new Date(updatedAt) : null;

    this.tasks = Array.isArray(tasks) ? tasks : [];
  }

  getProgress() {
    if (this.tasks.length === 0) return 0;

    const doneTasks = this.tasks.filter(t => t.status === "DONE").length;

    return Math.round((doneTasks / this.tasks.length) * 100);
  }
}

module.exports = Workflow;
