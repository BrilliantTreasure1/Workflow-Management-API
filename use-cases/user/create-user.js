const User = require("../../entities/user/User")

class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ fullname, email, passwordHash, date }) {
        try {
            const user = new User(null, fullname, email, passwordHash, date);
            const savedUser = await this.userRepository.create(user);
            return savedUser;
        } catch (error) {
            throw new Error(`CreateUser failed: ${error.message}`);
        }
    }
}

module.exports = CreateUser;