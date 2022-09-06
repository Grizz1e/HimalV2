const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription("Gives you invite link to the bot"),
    async execute(interaction, client) {
        let row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji('882683102890197062')
                    .setLabel('Invite Me')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://himal.grizz1e.com/invite')
            )
        interaction.reply({ content: `Visit https://himal.grizz1e.com to invite me`, components: [row] })
    }
}