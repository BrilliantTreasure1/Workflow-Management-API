const bcrypt = require("bcrypt");

class GetUserForAuth {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return null;

    const { passwordHash, ...safeUser } = user;

    return safeUser;
  }
}

module.exports = GetUserForAuth;
