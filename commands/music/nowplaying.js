const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('Shows the currently playing song'),
    async execute(interaction, client, player) {
        let queue = player.nodes.get(interaction.guildId)
        if (!queue) return await interaction.reply({ content: `❌ | There's nothing in the queue`, ephemeral: true })
        let currentTrack = queue.currentTrack
        let metadata
        await interaction.deferReply()
        if (currentTrack.type === 'lofi') {
            let url = `https://rest.amprad.io/metadata?station=${Buffer.from(process.env.LOFI).toString('base64')}`
            metadata = await fetch(url).then(async res => await res.json())
        }
        let embed = new EmbedBuilder()
            .setColor('#99ff66')
            .setTitle(currentTrack.title)
            .setThumbnail(currentTrack.thumbnail)
            .setDescription(`▶️ [\`${metadata?.title || currentTrack.title}\`](${currentTrack.url})\n${queue.node.createProgressBar()}\n**Requested by:** <@${currentTrack.requestedBy ? currentTrack.requestedBy.id : client.user.id}>`)
            .setURL(currentTrack.url)
        await interaction.followUp({ embeds: [embed] })
    }
}