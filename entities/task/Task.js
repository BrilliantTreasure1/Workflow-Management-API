const TaskPriority = require("./TaskPriority");
const TaskStatus = require("./TaskStatus");

class Task {
    constructor({
        id,
        workflowId,
        title,
        description,
        priority = TaskPriority.MEDIUM,
        status = TaskStatus.PENDING,
        dueDate,
        createdAt = new Date(),
        updatedAt,
        completedAt
    }) {

        this.id = id;
        this.workflowId = workflowId;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.dueDate = dueDate ? new Date(dueDate) : null;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.completedAt = completedAt;

        this.validate();
    }

    validate() {

        if (this.id !== undefined && typeof this.id !== "number") {
            throw new Error("Task id must be a number");
        }

        if (!this.workflowId || typeof this.workflowId !== "number") {
            throw new Error("workflowId must be a number");
        }

        if (!this.title || typeof this.title !== "string" || this.title.trim().length < 3) {
            throw new Error("Task title must be at least 3 characters");
        }

        if (this.description && typeof this.description !== "string") {
            throw new Error("description must be a string");
        }

        if (!Object.values(TaskPriority).includes(this.priority)) {
            throw new Error("Invalid task priority");
        }

        if (!Object.values(TaskStatus).includes(this.status)) {
            throw new Error("Invalid task status");
        }

        if (this.dueDate && isNaN(this.dueDate.getTime())) {
            throw new Error("Invalid dueDate");
        }

        if (!(this.createdAt instanceof Date) || isNaN(this.createdAt.getTime())) {
            throw new Error("Invalid createdAt");
        }
    }
}

module.exports = Task;
