// required modules
const keepAlive = require('./server.js'); // can be removed if you don't use repl.it to host your code
const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs')
const { config } = require('dotenv')
const func = require('./Util/function.js');
config({
  path: `${__dirname}/.env`
});

// GUILD_MESSAGES Not Needed
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]
});
client.func = func
client.commands = new Collection();

// Reads commands and events
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Stores commands in collection
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Checks for events
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Keeps the bot online in repl.it
keepAlive(); // can be removed if you don't use repl.it to host your code

// used to log in to bot client
client.login(process.env.DISCORD_TOKEN);

// Handles errors
process.on("unhandledRejection", (err) => {
  console.error(err);
});