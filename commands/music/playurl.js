const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const { QueryType } = require('discord-player')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playurl')
        .setDescription('Gimme the URL and I\'ll try to play it')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Audio URL to play')
                .setRequired(true)),
    async execute(interaction, client, player) {
        let canPlay = await client.function.canPlayInVC(interaction)
        if (!canPlay.canPlay) return await interaction.reply({ content: `❌ | ${canPlay.reason}`, ephemeral: true })
        await interaction.deferReply()
        const query = interaction.options.getString("url");

        try {
            const { track } = await player.play(interaction.member.voice.channel, query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.ARBITRARY,
                nodeOptions: {
                    leaveOnEmpty: false,
                    metadata: {
                        channel: interaction.channel
                    }
                }
            })

            let addedEmbed = new EmbedBuilder()
                .setColor('#99ff66')
                .setDescription(`⏱️ | Added track **${track.title}** to the queue!`)

            interaction.followUp({ embeds: [addedEmbed] });

        } catch (err) {
            return interaction.followUp(`⚠️ | An unexpected error occurred: ${err.message}`)
        }

    }
}