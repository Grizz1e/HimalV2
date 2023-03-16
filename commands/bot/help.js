const { EmbedBuilder, SlashCommandBuilder, ComponentType } = require('discord.js')
const fs = require('fs')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows you a help menu!'),
  async execute(interaction, client) {
    console.log(await client.application.commands.cache)
    let intro = `The available commands are provided below. To view the available commands, select the command name from the selection menu provided below`
    let components = await client.function.helpComponentBuilder()
    let embed = new EmbedBuilder()
      .setColor('#99ff66')
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(`${intro}\n\n**Join a Voice Channel and hit the ▶️ button to start playing**\n\n**Available Categories**\n🎶 **Music**\n🤖 **Bot**`)
    await interaction.reply({ embeds: [embed], components: components })
    try {
      let filter = u => u.user.id === interaction.member.id;
      let collector = await interaction.channel.awaitMessageComponent({
        filter,
        time: 30000,
        componentType: ComponentType.StringSelect
      })


      let category = collector.values[0].split('_')[1]
      let commands = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith(".js"))
      let capCategory = category.charAt(0).toUpperCase() + category.substr(1)
      let emojiSync = {
        'music': '🎶',
        'bot': '🤖'
      }
      components[0].components[0].setDisabled(true)
        .setPlaceholder(`${emojiSync[category]} ${capCategory}`)
      collector.deferUpdate()
      embed.setTitle(`${emojiSync[category]} ${capCategory} Commands`)


        .setDescription(`> `)                                                     //<${commands.join('> • <').replace(/.js/g, '')}`)



      await interaction.editReply({ embeds: [embed], components: components })
    } catch (err) {
      return
    }
  }
}
