const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows you a help menu!'),
  async execute(interaction, client) {
    let embed = new MessageEmbed()
      .setColor('GREEN')
      .setAuthor("Kavya's Help Menu", client.user.displayAvatarURL())
      .setDescription("The available commands are provided below. To view the command description, just type `/` symbol and the command name, its description will show up.\n\n**Available Commands:**\n`forceplay`, `help`, `play`, `radio`, `stop`\n\n*Note: Kavya uses slash commands, it doesn't have a prefix*")
      .setFooter('An open sourced project by Grizz1e')
      .setTimestamp()
    await interaction.reply({ embeds: [embed], components: [await client.func.rowMaker()] });
  },
};