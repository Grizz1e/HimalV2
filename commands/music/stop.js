const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription("Stops the current music session"),
  async execute(interaction, client, player) {
    let canPlay = await client.function.canPlayInVC(interaction)
    if (!canPlay.canPlay) return await interaction.reply({ content: `❌ | ${canPlay.reason}`, ephemeral: true })
    let queue = await player.getQueue(interaction.guild)
    if (!queue) return await interaction.reply({ content: `❌ | There's nothing in the queue`, ephemeral: true })
    if (!client.function.isTrackOwner(queue.nowPlaying()) && !client.function.isDJ(interaction.member, interaction.guild.members.me.voice.channel)) return await interaction.reply({ content: `❌ | You neither are a track owner, nor you have a role named \`DJ\`` })
    let embed = new EmbedBuilder()
      .setColor('#ff6666')
      .setDescription(`⏹️ | Stopped playing in \`${interaction.guild.members.me.voice.channel.name}\``)
    await interaction.reply({ embeds: [embed] })
    await queue.stop()
  }
}