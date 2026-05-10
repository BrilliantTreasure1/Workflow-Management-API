const express = require("express")

const userController = require("./controller/user-controller")


const app = express()
app.use(express.json())

app.post('/users', userController.create);
app.get('/users/:id', userController.getById);

 app.listen(3000, () => {
      console.log(`Server running on port 3000`);
    });