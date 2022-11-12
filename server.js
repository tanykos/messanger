const express = require('express');

// const SocketServer = require('ws').Server;
const app = express();
const PORT = 3000;

// app.use(express.static('./'));
app.use(express.static('./dist'));

let server = app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});

// const wss = new SocketServer({ server });
