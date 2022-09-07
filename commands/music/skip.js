const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription("Skips the currently playing audio track"),
    async execute(interaction, client, player) {
        let canPlay = await client.function.canPlayInVC(interaction)
        if (!canPlay.canPlay) return await interaction.reply({ content: `❌ | ${canPlay.reason}`, ephemeral: true })
        let queue = await player.getQueue(interaction.guild)
        if (!queue) return await interaction.reply({ content: `❌ | There's nothing in the queue`, ephemeral: true })
        if (!client.function.isTrackOwner(queue.nowPlaying(), interaction) && !client.function.isDJ(interaction.member, interaction.guild.members.me.voice.channel)) return await interaction.reply({ content: `❌ | You neither are a track owner, nor you have a role named \`DJ\`` })
        let title = queue.nowPlaying().title
        await queue.skip()
        let embed = new EmbedBuilder()
            .setColor('#99ff66')
            .setDescription(`⏩ | Skipped **${title}**`)
        await interaction.reply({ embeds: [embed] })
    }
}