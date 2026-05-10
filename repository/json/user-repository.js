//repository/json/user-repository
const fs = require("fs").promises;
const path = require("path");

class UserRepositoryJson {
    constructor() {
        this.filePath = path.join(__dirname, "../../data/users.json");
    }

    async _readFile() {
        try {
            const data = await fs.readFile(this.filePath, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async _writeFile(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async create(user) {
        const users = await this._readFile();

        const newUser = {
            ...user,
            id: users.length ? users[users.length - 1].id + 1 : 1
        };

        users.push(newUser);

        await this._writeFile(users);

        return newUser;
    }

    async getUserById(id) {
        const users = await this._readFile();

        const user = users.find(u => u.id === Number(id));

        return user || null;
    }

    async getUserByEmail(email) {
    const users = await this._readFile();
    return users.find(u => u.email === email);
  }
}

module.exports = UserRepositoryJson;
