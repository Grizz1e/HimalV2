const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows you a help menu!'),
  async execute(interaction, client) {
    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('PRIMARY')
          .setEmoji('▶️')
          .setCustomId('play'),
        new MessageButton()
          .setStyle('LINK')
          .setURL('https://buymeacoffee.com/KavyaBot')
          .setEmoji('882685341444743198'),
        new MessageButton()
          .setStyle('LINK')
          .setURL('https://discord.com/invite/nZRMdQeK6m')
          .setEmoji('882684602639081492'),
        new MessageButton()
          .setLabel('Invite Me')
          .setStyle('LINK')
          .setURL('https://bit.ly/2UUusC8')
          .setEmoji('882683102890197062')
      )
    let embed = new MessageEmbed()
      .setColor('GREEN')
      .setAuthor("Kavya's Help Menu", client.user.displayAvatarURL())
      .setDescription("The available commands are provided below. To view the command description, just type `/` symbol and the command name, its description will show up.\n\n**Available Commands:**\n`forceplay`, `help`, `play`, `radio`, `stop`\n\n*Note: Kavya uses slash commands, it doesn't have a prefix*")
      .setFooter('An open sourced project by Grizz1e')
      .setTimestamp()
    await interaction.reply({ embeds: [embed], components: [row] });
  },
};