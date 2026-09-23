const userService = require('../services/UserService');

class UserController {
    async search(req, res) {
        try {
            const { username } = req.query;
            const result = await userService.searchUsers(username);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
