const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Shows the currently playing song'),
    async execute(interaction, client, player) {
        let queue = await player.getQueue(interaction.guild)
        if (!queue) return await interaction.reply({ content: `❌ | There's nothing in the queue`, ephemeral: true })
        let currentTrack = queue.nowPlaying()
        let embed = new EmbedBuilder()
            .setColor('#99ff66')
            .setThumbnail(currentTrack.thumbnail)
            .setDescription(`▶️ [\`${currentTrack.title}\`](${currentTrack.url})\n${queue.createProgressBar()}\n**Requested by:** <@${currentTrack.requestedBy.id}>`)
            .setURL(currentTrack.url)
        await interaction.reply({ embeds: [embed] })
    }
}