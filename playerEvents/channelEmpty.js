const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'channelEmpty',
    execute(queue, track) {
        let embed = new EmbedBuilder()
            .setColor('#ff6666')
            .setDescription(`**⚠️ Channel Empty, Help me save resource**\nAlthough I'm supposed to play 24/7, it is not recommended because of the cost\n\n**Here are some of the ways you can help me**\n> Disconnect me from VC *(recommended)*\n> [Host your own instance](https://github.com/Grizz1e/HimalV2)\n> [Buy me a coffee](https://ko-fi.com/Grizz1e)`)
        queue.metadata.channel.send({ embeds: [embed] })
    },
};