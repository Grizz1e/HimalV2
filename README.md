## ❗Prerequisites❗
- [Node.js 16+](https://nodejs.org/en/download/)
- [discord.js@14](https://discord.js.org/#/)

## 📝 Setup
- **Step 1:** Open `.env.example`
- **Step 2:** Put the required values and rename it to `.env`
- **Step 3:** Open the terminal and run `npm install`. This installs all the necessary packages
- **Step 4:** Run `node register.js`. This registers the slash commands to the guild
- **Step 5:** Finally run `node index.js` in your terminal

## 📝 Setup with Docker
- **Step 1:** Open `env.example`
- **Step 2:** Put the required values and rename it to `.env`
- **Step 3:** Run `docker-compose build`
- **Step 4:** Finally run `docker-compose up`

## NOTE:
- By default,  `register.js` registers the commands for single server. To register commands for all servers the bot is in, go to `register.js`, comment the code from line 34 - 37 and uncomment the code from line 39 - 42
- Sharding is not recommended for bots that are in less than 2,000 servers. To remove sharding, delete `index.js`, delete `./events/shardError.js` and rename `app.js` to `index.js`.

## 📝 [Support Server](https://discord.gg/nZRMdQeK6m)
You can join our server for any self hosting related issues or any problem with the bot.

## Replit Guide
If you want to use replit.com to run your code 24/7, follow these steps
- **Step 1:** Go to the terminal and run `npm install express`
- **Step 2:** Inside the root directory, create a file called `server.js`
- **Step 3:** Paste the code below into `server.js`
```js
const express = require('express')
const server = express();

server.all('/', (req, res) => {
  res.send('OK')
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready!")
  });
}

module.exports = keepAlive;
```
- **Step 4:** Go to `index.js` and at the top of the code, add `const keepAlive = require('./server.js')`;
- **Step 5:** Before the sharding manager is created, call the `keepAlive()` function. Your final code should look something like this:
```js
const keepAlive = require('./server.js');
const { ShardingManager } = require('discord.js');
.
.
keepAlive();
const manager = new ShardingManager('./app.js', { token: token });
.
.
```
- **Step 6:** Hit the "Run" button

## Stream URLs Used By Himal
- Lo-FI: https://boxradio-edge-00.streamafrica.net/lofi
- Zen: https://streaming.positivity.radio/pr/calm/icecast.audio
- Radio Stream: https://radio-browser.info

## 💨 Run the projects

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/Grizz1e/HimalV2)

[![Run on Repl.it](https://repl.it/badge/github/Grizz1e/HimalV2)](https://repl.it/github/Grizz1e/HimalV2)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Grizz1e/HimalV2)

Made with ❤️ and JavaScript!
