const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const axios = require('axios')
const osu = require('node-os-utils')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows current statistics about the bot'),
    async execute(interaction, client) {
        interaction.deferReply()
        let radioRes = await axios.get('https://nl1.api.radio-browser.info/json/stats')
        let radioStats = radioRes.data
        let djsVer = require('discord.js/package.json').version
        let nodeJSVer = process.version
        let ping = client.ws.ping
        let serverCount = client.guilds.cache.size
        let channelCount = client.voice.adapters.size
        let totalMem = (osu.mem.totalMem() / Math.pow(1024, 2)).toFixed(2)
        let usedMem = await osu.mem.used().then(mem => {
            return mem.usedMemMb
        })
        let uptime = `<t:${Math.floor((Date.now() - client.uptime) / 1000)}:R>`
        let cpuPercent = await osu.cpu.usage()
        let embed = new EmbedBuilder()
            .setColor('#99ff66')
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL(), })
            .addFields(
                { name: '⌛Memory Usage', value: `\`${usedMem}\`/\`${totalMem} MB\``, inline: true },
                { name: '⏱️Uptime', value: `${uptime}`, inline: true },
                { name: '📻Radio Stations', value: `\`${radioStats.stations.toLocaleString()}\``, inline: true },
                { name: '🖥️Servers', value: `\`${serverCount}\``, inline: true },
                { name: '📢Active Sessions', value: `\`${channelCount}\``, inline: true },
                { name: 'Discord.js', value: `\`${djsVer}\``, inline: true },
                { name: 'NodeJS', value: `\`${nodeJSVer}\``, inline: true },
                { name: '🏓Ping', value: `\`${ping}ms\``, inline: true },
                { name: '💽CPU Usage', value: `\`${cpuPercent}%\``, inline: true },
            )
        await interaction.followUp({ embeds: [embed] })
    },
};