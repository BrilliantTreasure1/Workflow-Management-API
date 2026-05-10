const CreateUser = require("../use-cases/user/create-user")
const GetUserById = require("../use-cases/user/get-user-by-id")
const UserRepository = require("../repository/postgre/user-repository");

const userRepository = new UserRepository()

const createUserUseCase = new CreateUser(userRepository)
const getUserByIdUseCase = new GetUserById(userRepository)

module.exports = {

  async create(req, res) {
    try {
      const { fullname, email, passwordHash, date } = req.body;

      if (!fullname || typeof fullname !== "string") {
        return res.status(400).json({ error: "fullname is required" });
      }

      if (!email) {
        return res.status(400).json({ error: "email is required" });
      }

      if (!passwordHash) {
        return res.status(400).json({ error: "passwordHash is required" });
      }

      const user = await createUserUseCase.execute({
        fullname,
        email,
        passwordHash,
        date
      });

      return res.status(201).json(user);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await getUserByIdUseCase.execute(id);

      return res.status(200).json(user);

    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

}
