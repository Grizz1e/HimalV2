const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('radio')
    .setDescription('Plays the stream from provided Radio station!')
    .addStringOption((option) =>
      option.setName('station')
        .setDescription('Name of the radio station')
        .setRequired(true),
    ),
  async execute(interaction, client) {
    axios.get(
      `http://all.api.radio-browser.info/json/stations/byname/${encodeURIComponent(interaction.options._hoistedOptions[0].value)}`
    ).then(function(response) {
      let data = response.data;
      if (data.length < 1) return interaction.reply('No radio station found with that name')
      else client.func.play(interaction, data[0].url, data[0].name)
    })
  },
};
