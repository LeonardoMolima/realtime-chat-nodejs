const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  //Busca do token dentro dos cookies da requisição
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Faça login para continuar.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado. Faça login novamente.' });
  }
};

module.exports = authMiddleware;
