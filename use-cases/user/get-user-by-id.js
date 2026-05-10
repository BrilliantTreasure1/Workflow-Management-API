class GetUserById {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(id) {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}

module.exports = GetUserById;
