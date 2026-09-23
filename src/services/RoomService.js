const roomRepository = require('../repositories/RoomRepository');

class RoomService {
    async createGroupRoom(userId, roomName) {
        if (!roomName) throw new Error('É obrigatório dar um nome para o chat room.');
    
        //Cria a sala
        const room = await roomRepository.create({name: roomName});
       
        //Extrai o id
        const roomId = room.id;

        //Adiciona o usuário como participante do chat room
        await roomRepository.addUserToRoom({userId, roomId});

        return room;
      }

      async getUserRooms(userId) {
        if (!userId) throw new Error('É preciso informar o id do usuário para buscar.');
    
        return await roomRepository.findUserRooms({userId});
      }

      async getOrCreateDirectRoom(loggedUserId, targetUserId) {
        if (loggedUserId === targetUserId) throw new Error('O usuário não pode iniciar um chat com ele mesmo');

        let room = await roomRepository.findDirectRoom(loggedUserId, targetUserId);

        if (room) return room;

        room = await roomRepository.create({name: null, isGroup: false});

        await roomRepository.addUserToRoom({ userId: loggedUserId, roomId: room.id });
        await roomRepository.addUserToRoom({ userId: targetUserId, roomId: room.id });

        return room;
      }

}

module.exports = new RoomService();