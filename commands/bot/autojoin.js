const { SlashCommandBuilder } = require("discord.js")
const { ChannelType, PermissionsBitField } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autojoin')
        .setDescription("Set the channel for the bot to auto join when someone joins the voice channel")
        .addSubcommand(subcommand =>
            subcommand
                .setName('enable')
                .setDescription('Enable auto join'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('disable')
                .setDescription('Disable auto join'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('setchannel')
                .setDescription('Set the channel for the bot to auto join')
                .addChannelOption(option =>
                    option.setName('voicechannel')
                        .setDescription('Voice channel to auto join')
                        .setRequired(true))
                .addChannelOption(option =>
                    option.setName('textchannel')
                        .setDescription('Text channel to send the message')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Removes the auto join channel')),
    async execute(interaction, client) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {

            let subcommand = interaction.options.getSubcommand()
            if (subcommand === 'enable') {
                let guild = await client.db.get(`guilds.${interaction.guildId}`)

                if (!guild || !guild.voicechannel || !guild.textchannel) {
                    return await interaction.reply({ content: `❌ | Please set the autojoin channel first using \`/autojoin setchannel\``, ephemeral: true })
                } else if (guild.enabled) {
                    return await interaction.reply({ content: `❌ | Auto join is already enabled`, ephemeral: true })
                } else {
                    await client.db.set(`guilds.${interaction.guildId}.enabled`, true)
                    await interaction.reply({ content: `✅ | Successfully enabled auto join` })
                }
            } else if (subcommand === 'disable') {
                let guild = await client.db.get(`guilds.${interaction.guildId}`)

                if (!guild || !guild.voicechannel || !guild.textchannel) {
                    return await interaction.reply({ content: `❌ | Please set the autojoin channel first using \`/autojoin setchannel\``, ephemeral: true })
                } else if (!guild.enabled) {
                    return await interaction.reply({ content: `❌ | Auto join is already disabled`, ephemeral: true })
                } else {
                    await client.db.set(`guilds.${interaction.guildId}.enabled`, false)
                    await interaction.reply({ content: `✅ | Successfully disabled auto join` })
                }
            } else if (subcommand === 'remove') {
                await client.db.pull(`guilds.${interaction.guildId}`)
                await interaction.reply({ content: `✅ | Successfully removed the auto join channel` })
            } else if (subcommand === 'setchannel') {
                let voiceChannel = interaction.options.getChannel('voicechannel')
                let textChannel = interaction.options.getChannel('textchannel')

                let supportedVC = [ChannelType.GuildVoice, ChannelType.GuildStageVoice]

                if (supportedVC.includes(voiceChannel.type) && textChannel.type === ChannelType.GuildText) {

                    await client.db.set(`guilds.${interaction.guildId}`, {
                        textchannel: textChannel.id,
                        voicechannel: voiceChannel.id,
                        enabled: true,
                    })
                    await interaction.reply({ content: `✅ | Successfully set the voice channel to <#${voiceChannel.id}> and text channel to <#${textChannel.id}>` })
                } else {
                    await interaction.reply({ content: `❌ | Invalid channel type was provided`, ephemeral: true })
                }
            }
        } else {
            await interaction.reply({ content: `❌ | You don't have the required permissions to use this command`, ephemeral: true })
        }
    }
}