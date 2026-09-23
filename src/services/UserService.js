const userRepository = require('../repositories/UserRepository');

class UserService{
    async searchUsers(username) {
        //Se não existir ou for menor que 3, devolve array vazio
        if (!username || username.length < 3) return [];
    
        const searchResult = await userRepository.findByILikeUsername({searchName: username});
        return searchResult;
      }
}

module.exports = new UserService();