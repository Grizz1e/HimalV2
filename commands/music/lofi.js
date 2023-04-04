const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const {QueueRepeatMode } = require("discord-player")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lofi')
    .setDescription("Starts playing Lo-fi Beats!"),
  async execute(interaction, client, player) {
    let canPlay = await client.function.canPlayInVC(interaction)
    if (!canPlay.canPlay) return await interaction.reply({ content: `❌ | ${canPlay.reason}`, ephemeral: true })
    await interaction.deferReply()

    try {
      const { track } = await player.play(interaction.member.voice.channel, process.env.LOFI, {
        requestedBy: interaction.user,
        nodeOptions: {
          leaveOnEmpty: false,
          metadata: {
            channel: interaction.channel
          }
        }
      })
      track.title = "Lo-fi Beats"
      track.type = "lofi"

      let addedEmbed = new EmbedBuilder()
        .setColor('#99ff66')
        .setDescription(`⏱️ | Added track **${track.title}** to the queue!`)

      interaction.followUp({ embeds: [addedEmbed] });

    } catch (err) {
      return interaction.followUp(`⚠️ | An unexpected error occurred: ${err.message}`)
    }
  }
}