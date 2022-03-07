const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the current Voice session'),
  async execute(interaction, client) {
    client.func.stop(interaction);
  },
};