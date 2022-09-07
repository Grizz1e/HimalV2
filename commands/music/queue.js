const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription("Shows the current queue"),
    async execute(interaction, client, player) {
        let queue = await player.getQueue(interaction.guild)
        if (!queue) return await interaction.reply({ content: `❌ | There's nothing in the queue`, ephemeral: true })
        let current = await queue.nowPlaying().title
        let upNext = await queue.tracks.map((x, i) => `\`${i + 1}\` ${x.title.substring(0, 20)}...`)
        let embed = new EmbedBuilder()
            .setColor('#99ff66')
            .setTitle('🎶 Music Queue')
            .setDescription(`**Currently Playing**\n> ${current.substring(0, 10)}\n**Upcoming**\n${upNext.length < 1 ? '*N/A*' : upNext.join('\n')}`)
        interaction.reply({ embeds: [embed] })
    }
}