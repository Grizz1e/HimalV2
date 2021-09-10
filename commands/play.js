const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Starts playing Lo-fi radio station!'),
  async execute(interaction, client) {
    client.func.play(interaction, Date.now() % 2 === 0 ? process.env.LOFI_1 : process.env.LOFI_2, 'Lo-fi Beats')
  },
};
