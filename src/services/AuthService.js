const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UserRepository');

class AuthService {
  async register(username, email, password) {
    if (!username || !email || !password) throw new Error('Todos os campos são obrigatórios.');

    //Verifica duplicidade
    if (await userRepository.findByEmail(email)) throw new Error('E-mail já está em uso.');
    if (await userRepository.findByUsername(username)) throw new Error('Nome de usuário já está em uso.');

    const passwordHash = await bcrypt.hash(password, 10);
    
    return await userRepository.create({ username, email, passwordHash });
  }

  async login(email, password) {
    if (!email || !password) throw new Error('E-mail e senha são obrigatórios.');

    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('Credenciais inválidas.');

    //Compara a senha digitada com o hash salvo no banco
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) throw new Error('Credenciais inválidas.');

    //Gera o Token JWT com duração de 7 dias
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    //Remove a senha do objeto antes de devolver para o Controller
    delete user.password_hash;
    
    return { user, token };
  }
}

module.exports = new AuthService();