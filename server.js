const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: PORT });

console.log(`✅ WebSocket server running on ws://localhost:${PORT}`);

server.on('connection', (socket) => {
  console.log('🔌 Client connected');

  socket.on('message', (message) => {
    console.log('📨 Received:', message);
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Echo: ${message}`);
      }
    });
  });

  socket.on('close', () => {
    console.log('❌ Client disconnected');
  });
});
