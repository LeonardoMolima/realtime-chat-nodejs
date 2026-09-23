const express = require('express');
const userController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota protegida para buscar usuários pelo prefixo do username
router.get('/search', authMiddleware, userController.search);

module.exports = router;
