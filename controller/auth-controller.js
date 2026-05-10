const jwt = require("jsonwebtoken");
const GetUserForAuth = require("../use-cases/auth/login-user");
const UserRepository = require("../repository/json/user-repository");

const getUserForAuth = new GetUserForAuth(new UserRepository());

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "email and password are required"
        });
      }

      const user = await getUserForAuth.execute(email, password);

      if (!user) {
        return res.status(401).json({
          error: "invalid credentials"
        });
      }

      const secret = process.env.JWT_SECRET || "DEV_SECRET_KEY";

      const token = jwt.sign(
        { userId: user.id },
        secret,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "login successful",
        token,
        user
      });

    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        error: "internal server error"
      });
    }
  }
};
