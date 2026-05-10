//entities/user/User.js
class User {
    constructor({ id, fullName, email, passwordHash, createdAt }) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt || new Date();

        this.validate();
    }

    validate() {
        // 1. Validate ID
        if (this.id !== undefined && typeof this.id !== 'number') {
            throw new Error('User ID must be a valid number');
        }

        // 2. Validate Full Name
        if (!this.fullName || typeof this.fullName !== 'string' || this.fullName.trim().length < 3) {
            throw new Error('Full name is required and must be at least 3 characters');
        }

        // 3. Validate Email
        if (!this.email || !this._isValidEmail(this.email)) {
            throw new Error('A valid email address is required');
        }

        // 4. Validate Password Hash
        if (!this.passwordHash || typeof this.passwordHash !== 'string') {
            throw new Error('Password hash is required for security');
        }

        // 5. Validate Date
        if (!(this.createdAt instanceof Date) || isNaN(this.createdAt.getTime())) {
            throw new Error('Invalid creation date');
        }
    }

    _isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateProfile(newName) {
        this.fullName = newName;
        this.validate();
    }
}

module.exports = User;
