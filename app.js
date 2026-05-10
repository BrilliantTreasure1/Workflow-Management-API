const express = require("express")

const userController = require("./controller/user-controller")
const authController = require("./controller/auth-controller")
const authMiddleware = require("./middleware/auth")
const workflowController = require("./controller/workflow-controller")




const app = express()
app.use(express.json())

app.post('/users', userController.create);
app.get('/users/:id', authMiddleware,userController.getById);

app.post('/auth/login', authController.login);

app.post('/users/:userId/workflows', authMiddleware , workflowController.create);



 app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    });