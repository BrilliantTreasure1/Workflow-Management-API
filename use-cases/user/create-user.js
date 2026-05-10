const User = require("../../entities/user/User")

class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ fullname, email, passwordHash, date }) {
        try {
             const user = new User({
                id: undefined,
                fullName: fullname,
                email: email,
                passwordHash: passwordHash,
                createdAt: date ? new Date(date) : new Date()
            });
            
            const savedUser = await this.userRepository.create(user);
            return savedUser;
        } catch (error) {
            throw new Error(`CreateUser failed: ${error.message}`);
        }
    }
}

module.exports = CreateUser;