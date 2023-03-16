const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client, player) {
        if (newState.channel) {


            if (newState.guild.members.me.voice.channelId) return
            if (newState.channel.members.has(client.user.id)) return

            let data = await client.db.get(`guilds.${newState.guild.id}`)
            if (!data) return
            if (newState.channel.id !== data.voicechannel) return

            else {
                let channel = await client.channels.fetch(data.textchannel)
                try {
                    const { track } = await player.play(data.voicechannel, process.env.LOFI, {
                        requestedBy: newState.member.user,
                        nodeOptions: {
                            leaveOnEmpty: false,
                            metadata: {
                                channel: channel
                            }
                        }
                    })
                    track.title = "Lo-fi Beats"
                    track.type = "lofi"

                    let addedEmbed = new EmbedBuilder()
                        .setColor('#99ff66')
                        .setDescription(`⏱️ | Added track **${track.title}** to the queue!`)

                    channel.send({ embeds: [addedEmbed] });

                } catch (err) {
                    return channel.send(`⚠️ | An unexpected error occurred: ${err.message}`)
                }
            }
        }
    },
};