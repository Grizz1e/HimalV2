const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Starts playing Lo-fi radio station!'),
  async execute(interaction, client) {
    client.func.play(interaction, process.env.LOFI_STREAM, 'Lo-fi Beats')
  },
};