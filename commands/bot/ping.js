const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Shows ping"),
    async execute(interaction, client) {
        interaction.reply({ content: `🏓Pong! \`${client.ws.ping}ms\`` })
    }
}