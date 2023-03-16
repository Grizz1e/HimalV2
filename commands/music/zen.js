const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('zen')
    .setDescription("Starts playing Zen radio station"),
  async execute(interaction, client, player) {
    let canPlay = await client.function.canPlayInVC(interaction)
    if (!canPlay.canPlay) return await interaction.reply({ content: `❌ | ${canPlay.reason}`, ephemeral: true })
    await interaction.deferReply()

    try {
      const { track } = await player.play(interaction.member.voice.channel, process.env.LOFI, {
        requestedBy: interaction.user,
        type: 'zen',
        nodeOptions: {
          leaveOnEmpty: false,
          metadata: {
            channel: interaction.channel
          }
        }
      })
      track.title = "Zen Radio"

      let addedEmbed = new EmbedBuilder()
        .setColor('#99ff66')
        .setDescription(`⏱️ | Added track **${track.title}** to the queue!`)

      interaction.followUp({ embeds: [addedEmbed] });

    } catch (err) {
      return interaction.followUp(`⚠️ | An unexpected error occurred: ${err.message}`)
    }
  }
}