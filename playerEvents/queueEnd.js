const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'queueEnd',
    execute(queue, track) {
        let embed = new EmbedBuilder()
            .setColor('#99ff66')
            .setDescription(`**🗒️ | Queue ended!**\nTo save resources, I've disconnected from the VC`)
        queue.metadata.channel.send({ embeds: [embed] })
    },
};