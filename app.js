const express = require("express")

const userController = require("./controller/user-controller")
const authController = require("./controller/auth-controller")
const authMiddleware = require("./middleware/auth")
const workflowController = require("./controller/workflow-controller")
const taskController = require("./controller/task-controller")


const app = express()
app.use(express.json())

app.post('/users', userController.create);
app.get('/users/:id', authMiddleware,userController.getById);

app.post('/auth/login', authController.login);

app.post('/workflows', authMiddleware , workflowController.create);
app.get('/workflows/me', authMiddleware , workflowController.findByUser);
app.get('/workflows/:id', authMiddleware , workflowController.findById);
app.put("/workflows/:id",authMiddleware,workflowController.update);
app.delete("/workflows/:id",authMiddleware,workflowController.delete);

app.post('/workflows/:workflowId/tasks', authMiddleware,taskController.create);
app.get('/workflows/:workflowId/tasks', authMiddleware,taskController.listByWorkflow);





 app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    });