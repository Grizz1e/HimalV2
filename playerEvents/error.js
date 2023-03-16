const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'error',
    execute(queue, error) {
        let embed = new EmbedBuilder()
            .setColor('RED')
            .setDescription(`**⚠️ | An unexpected error occurred!`)
        queue.metadata.channel.send({ embeds: [embed] })
        console.log(error)
    },
};