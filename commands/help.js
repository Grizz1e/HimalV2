const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows you a help menu!'),
  async execute(interaction, client) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('play')
          .setStyle(ButtonStyle.Primary)
          .setEmoji({ name: '▶️' }),
        new ButtonBuilder()
          .setURL('https://ko-fi.com/Grizz1e')
          .setEmoji('919834131670646824')
          .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
          .setURL('https://discord.com/invite/nZRMdQeK6m')
          .setEmoji('882684602639081492')
          .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
          .setURL('https://himal.grizz1e.xyz')
          .setEmoji('882684602639081492')
          .setStyle(ButtonStyle.Link)
          .setLabel('Invite Me')
      )

    const embed = new EmbedBuilder()
      .setColor('#99ff66')
      .setAuthor({ name: `${client.user.username}'s Help Menu`, iconURL: client.user.displayAvatarURL() })
      .setDescription("The available commands are provided below. To view the command description, select the command name from the selection menu provided below\n\n**Join a Voice Channel and hit the ▶️ button to start playing**\n\n**Available Commands:**\n`forceplay`, `help`, `play`, `radio`, `stop`, `zen`\n\n[Github](https://github.com/grizz1e/HimalV2)")
      .setFooter({ text: 'Made with ❤️ by Grizz1e' })
      .setTimestamp()
    interaction.reply({ embeds: [embed], components: [row] })
  },
};