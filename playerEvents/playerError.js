const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'playerError',
    execute(queue, error) {
        let embed = new EmbedBuilder()
            .setColor('RED')
            .setDescription(`**⚠️ | An error occurred when establishing connection with Discord**`)
        queue.metadata.channel.send({ embeds: [embed] })
        console.log(error)
    },
};