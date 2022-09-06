const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const fs = require('fs');
const { config } = require('dotenv')
config({
	path: `${__dirname}/.env`
});
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [];
const commandDir = fs.readdirSync('./commands', { withFileTypes: true }).filter(item => item.isDirectory()).map(dir => dir.name)

for (const dir of commandDir) {
	const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'))
	for (const file of commandFiles) {
		const command = require(`./commands/${dir}/${file}`);
		commands.push(command.data.toJSON());
	}
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		/*
		To register commands for every guilds the bot is in, comment the code below
		and uncomment the code from line 36 to line 39
		you can also remove line 10
		*/

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		// await rest.put(
		// 	Routes.applicationCommands(clientId),
		// 	{ body: commands },
		// );


		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();