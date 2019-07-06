const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('chatMessage', (message) => {
    console.log('New message: ', message);
    
    io.emit("serverMesasge", message);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);