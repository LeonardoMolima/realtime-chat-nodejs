const express = require('express');
const messageController = require('../controllers/MessageController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// O authMiddleware garante que ninguém sem estar logado acesse essas rotas
router.get('/:roomId', authMiddleware, messageController.listByRoom);

module.exports = router;
