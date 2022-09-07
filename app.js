const { Client, GatewayIntentBits, Collection } = require('discord.js')
const fs = require('fs')
const path = require('path')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] })
const { Player } = require('discord-player')
const { config } = require('dotenv')
config({
	path: `${__dirname}/.env`
});
const token = process.env.TOKEN;

client.commands = new Collection();
client.function = require('./Utils/functions.js')
const player = new Player(client)

require(`./Utils/cmdHandler`)(client)


const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))
const playerEventsPath = path.join(__dirname, 'playerEvents')
const playerEventFiles = fs.readdirSync(playerEventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file)
	const event = require(filePath)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client))
	} else {
		client.on(event.name, (...args) => event.execute(...args, client, player))
	}
}


for (const file of playerEventFiles) {
	const filePath = path.join(playerEventsPath, file)
	const playerEvent = require(filePath)
	player.on(playerEvent.name, async (...args) => playerEvent.execute(...args, client))
}
client.login(token)
process.on("unhandledRejection", (err) => {
	console.error(err)
});