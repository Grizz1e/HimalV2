const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');
const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('forceplay')
    .setDescription('Allows you to forceplay the given station!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('lofi')
        .setDescription('Force plays Lo-Fi Beats!')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('radio')
        .setDescription('Force plays given radio station!')
        .addStringOption((option) =>
            option.setName('station')
              .setDescription('Name of the radio station')
              .setRequired(true)
        )      
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('zen')
        .setDescription('Force plays zen radio!')
    ),
    async execute(interaction, client) {
      let subcmd = interaction.options.getSubcommand()
      interaction.forceplay = true;
      if (subcmd === 'lofi') {
        client.commands.get('play').execute(interaction, client)
      } else if (subcmd === 'zen') {
        client.commands.get('zen').execute(interaction, client)
      } else {
        client.commands.get('radio').execute(interaction, client)
      }
    },
};