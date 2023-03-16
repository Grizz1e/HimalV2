const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription("Shows the current queue"),
    async execute(interaction, client, player) {
        let queue = player.nodes.get(interaction.guildId)
        if (!queue) return await interaction.reply({ content: `❌ | There's nothing in the queue`, ephemeral: true })
        let current = await queue.currentTrack
        let upNext = await queue.tracks.map((x, i) => `\`${i + 1}\` ${x.title.substring(0, 50)} - [<@${x.requestedBy.id}>]`)

        let desc = `**Currently Playing**\n> ${current.title.substring(0, 50) + "<@" + current.requestedBy.id}>\n**Upcoming**\n${upNext.length < 1 ? '*N/A*' : upNext.join('\n')}`

        if (desc.length > 4096) desc = desc.substring(0, 4093) + '...'

        let embed = new EmbedBuilder()
            .setColor('#99ff66')
            .setTitle('🎶 Music Queue')
            .setDescription(desc)
            .setFooter({ text: `${queue.size} tracks in queue` })
        interaction.reply({ embeds: [embed] })
    }
}