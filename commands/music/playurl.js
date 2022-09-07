// secretly this is a /play command
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

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

        const queue = player.createQueue(interaction.guild, {
            leaveOnEmpty: false,
            metadata: {
                channel: interaction.channel
            }
        });
        queue.setRepeatMode(3)
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy()
            return await interaction.followUp({ content: "❌ | Could not join your voice channel!", ephemeral: true });
        }
        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        await queue.play(track)
        let addedEmbed = new EmbedBuilder()
            .setColor('#99ff66')
            .setDescription(`⏱️ | Added track **${track.title}** to the queue!`)
        return await interaction.followUp({ embeds: [addedEmbed] });

    }
}