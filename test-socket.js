const { io } = require("socket.io-client");

const roomId = "93027e65-cf9c-47b7-bf0c-ca987d56a614";
const userA_Id = "232782ef-1588-4e96-a95c-669edfd84c56";

// Conecta dois sockets distintos
const socketAna = io("http://localhost:3333");
const socketBeto = io("http://localhost:3333");

// Ambos entram na sala virtual
socketAna.emit("joinRoom", roomId);
socketBeto.emit("joinRoom", roomId);

// Beto escuta a chegada de mensagens
socketBeto.on("newMessage", (msg) => {
  console.log("⚡ [SOCKET] Beto recebeu ao vivo:", msg);
  process.exit(0);
});

// Ana envia a mensagem via WebSocket
setTimeout(() => {
  console.log("📤 Ana enviando mensagem...");
  socketAna.emit("sendMessage", {
    roomId,
    userId: userA_Id,
    content: "Fala Beto! Nosso chat 1:1 tá rodando em tempo real!"
  });
}, 1000);
