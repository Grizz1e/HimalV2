const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription("Shuffles the queue"),
    async execute(interaction, client, player) {
        let canPlay = await client.function.canPlayInVC(interaction)
        if (!canPlay.canPlay) return await interaction.reply({ content: `❌ | ${canPlay.reason}`, ephemeral: true })
        let queue = player.nodes.get(interaction.guildId)
        if (!queue) return await interaction.reply({ content: `❌ | There's nothing in the queue`, ephemeral: true })
        if (!client.function.isDJ(interaction.member, interaction.guild.members.me.voice.channel)) return await interaction.reply({ content: `❌ | You don't have a role named \`DJ\`` })
        await queue.tracks.shuffle()
        let embed = new EmbedBuilder()
            .setColor('#99ff66')
            .setDescription(`🔀 | The queue has been shuffled`)
        await interaction.reply({ embeds: [embed] })
    }
}