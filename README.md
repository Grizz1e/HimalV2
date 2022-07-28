## ❗Prerequisites❗
- [Node.js 16+](https://nodejs.org/en/download/)
- [discord.js@14](https://discord.js.org/#/)

**DO NOT JOIN OUR DISCORD FOR SELF HOSTING ISSUES**

## 📝 Setup
- **Step 1:** Open `.env.example`
- **Step 2:** Put the required values and rename it to `.env`
- **Step 3:** Open the terminal and run `npm install`. This installs all the necessary packages
- **Step 4:** Run `node register.js`. This registers the slash commands to the guild
- **Step 5:** Finally run `node index.js` in your terminal

## 📝 [Support Server](https://discord.gg/nZRMdQeK6m)

## **DO NOT JOIN OUR DISCORD FOR SELF HOSTING ISSUES. WE WILL NOT HELP YOU.**

## Replit Guide
If you want to use replit.com to run your code 24/7, follow these steps
- **Step 1:** Go to the terminal and run `npm install express`
- **Step 2:** Inside the root directory, create a file called `server.js`
- **Step 3:** Paste the code below into `server.js`
```
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
- **Step 4:** Go to `index.js` and at the top of the code, add `const keepAlive = require('./server.js');
- **Step 5:** Before `client.login(token)` at line 34, add `keepAlive();`. Your final code should look something like this
```
const keepAlive = require('./server.js');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
.
.
keepAlive();
client.login(token);
.
.
```
- **Step 6:** Hit the "Run" button

## Stream URLs Used By Himal
Lo-FI: https://ec2.yesstreaming.net:1915/stream
Zen: https://streaming.positivity.radio/pr/calm/icecast.audio
Radio Stream: https://radio-browser.info

## 💨 Run the projects

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/Grizz1e/HimalV2)

[![Run on Repl.it](https://repl.it/badge/github/Grizz1e/HimalV2)](https://repl.it/github/Grizz1e/HimalV2)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Grizz1e/HimalV2)

Made with ❤️ and JavaScript!
