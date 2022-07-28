const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');
const { EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the current Voice session!'),
  async execute(interaction, client) {
    const connection = await getVoiceConnection(interaction.guildId);
    if (!connection) {
      interaction.reply({ content: ":x: | Sorry, Cannot complete your request at the moment\nReason: Bot Not In VC", ephemeral: true })
    } else if ((!interaction.member.voice.channelId) || (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)) {
      interaction.reply({ content: ":x: | Sorry, Cannot complete your request at the moment\nReason: Author Not In VC", ephemeral: true })
    } else {
      connection.destroy();
      let embed = new EmbedBuilder()
        .setColor('#ff6666')
        .setDescription(`**⏹️ | Stopped playing in <#${interaction.guild.members.me.voice.channelId}>**`)
      interaction.reply({ embeds: [embed], components: [await client.function.createButtons()] })
    }
  },
};