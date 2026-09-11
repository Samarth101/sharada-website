const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080/ws');

ws.on('open', () => {
  console.log('Connected');
  ws.send(JSON.stringify({ type: 'user_message', text: 'hello' }));
});

ws.on('message', (data) => {
  console.log('Received:', data.toString());
});

ws.on('error', (err) => console.error(err));
ws.on('close', () => console.log('Closed'));

setTimeout(() => {
  ws.close();
  process.exit(0);
}, 3000);
