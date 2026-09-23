const express = require('express');
const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Rota protegida
router.get('/me', authMiddleware, async (req, res) => {
    res.json({ 
      message: 'Você acessou uma rota protegida!', 
      userId: req.userId 
    });
  });

module.exports = router;
