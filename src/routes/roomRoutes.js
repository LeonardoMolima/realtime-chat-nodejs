const express = require('express');
const roomController = require('../controllers/RoomController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// O authMiddleware garante que ninguém sem estar logado acesse essas rotas
router.post('/group', authMiddleware, roomController.createGroup);
router.post('/direct', authMiddleware, roomController.createDirect);
router.get('/', authMiddleware, roomController.list);

module.exports = router;
