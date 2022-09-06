const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'trackStart',
    execute(queue, track) {
        let embed = new EmbedBuilder()
            .setColor('#99ff66')
            .setDescription(`🎶 | Started playing **${track.title}** in \`🔊 ${queue.metadata.channel.guild.members.me.voice.channel.name}\`!`)
        queue.metadata.channel.send({ embeds: [embed] })
    },
};