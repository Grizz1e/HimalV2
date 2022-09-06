const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('zen')
    .setDescription("Starts playing Zen radio station"),
  async execute(interaction, client, player) {
    let canPlay = await client.function.canPlayInVC(interaction)
    if (!canPlay.canPlay) return await interaction.reply({ content: `❌ | ${canPlay.reason}`, ephemeral: true })
    await interaction.deferReply()
    const track = await player.search(process.env.ZEN, {
      requestedBy: interaction.user
    }).then(x => x.tracks[0]);
    track.title = 'Zen Radio'
    track.thumbnail = client.user.displayAvatarURL()
    const queue = player.createQueue(interaction.guild, {
      leaveOnEmpty: false,
      metadata: {
        channel: interaction.channel
      }
    });
    try {
      if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
      queue.destroy()
      return await interaction.followUp({ content: "❌ | Could not join your voice channel!", ephemeral: true });
    }
    await queue.play(track)
    let addedEmbed = new EmbedBuilder()
      .setColor('#99ff66')
      .setDescription(`⏱️ | Added track **${track.title}** to the queue!`)
    return await interaction.followUp({ embeds: [addedEmbed] });
  }
}