const authService = require('../services/AuthService');

class AuthController {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await authService.register(username, email, password);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);

      //Injeta o Token no Cookie (HTTP-Only)
      res.cookie('token', token, {
        httpOnly: true, //evita XSS
        secure: process.env.NODE_ENV === 'production', //Só funciona em HTTPS na produção
        sameSite: 'strict', //Protege contra CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000 //Expira em 7 dias (milissegundos)
      });

      return res.json({ message: 'Login realizado com sucesso!', user });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    res.clearCookie('token');
    return res.json({ message: 'Logout realizado com sucesso!' });
  }
}

module.exports = new AuthController();
