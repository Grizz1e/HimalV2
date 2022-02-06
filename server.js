// Remove this file if you don't use repl.it to host your code
// Also check index.js for the code that is used to keep the bot online
const express = require('express')
const server = express();

server.all('/', (req, res) => {
  res.send('OK')
})

function keepAlive() {
  server.listen(3000, () => { console.log("Server is ready!") });
}

module.exports = keepAlive;