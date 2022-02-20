const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client, player) {

    // button response in the help menu
    if (interaction.isButton()) {
      if (interaction.customId === 'play') {
        client.func.play(interaction, Date.now() % 2 === 0 ? process.env.LOFI_1 : process.env.LOFI_2, 'Lo-fi Beats')
      } else return;
    }

    // select menu response
    if (interaction.isSelectMenu) {

      if (interaction.customId === 'select') {
        let desc
        switch (interaction.values[0]) {
          case 'play':
            desc = ['Starts playing Lo-fi radio station!']
            break;
          case 'radio':
            desc = ['Plays the stream from provided Radio station!', 'station', 'The name of the station to play', true]
            break;
          case 'forceplay':
            desc = ['Allows you to force play the given radio station', 'station', 'The name of the station to play', false]
            break;
          case 'stop':
            desc = ['Stops the current Voice session']
            break;
          case 'zen':
            desc = ['Starts playing Zen radio station!']
            break;
        }
        const embed = new MessageEmbed()
          .setColor('GREEN')
          .setAuthor({ name: "Himal's Help Menu", iconURL: client.user.displayAvatarURL() })
          .setTitle(`/${interaction.values[0]}`)
          .setDescription(`${desc[0]}\n\n**Options**\n${desc.length == 1 ? "*Does not contain any options*" : `\`${desc[1]}\` - ${desc[2]} - ${desc[3] ? "Required" : "Optional"}`}`)
          .setFooter({ text: 'Himal', iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
        interaction.reply({ embeds: [embed], ephemeral: true })
      }

    }

    // if not a slash command, return
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    // execution and error handling
    try {
      await command.execute(interaction, client, player);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  },
};