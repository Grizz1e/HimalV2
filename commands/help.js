const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton,MessageSelectMenu, MessageComponentCollector  } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows you a help menu!'),
  async execute(interaction ,client) {
    
const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions(
						{
							label: 'play',
							description: 'Description of command play',
							value:`Name: play
              Description: Plays Lo-Fi beats in voice channel / Stage`,
						},
						{
							label: 'radio',
							description: 'Description of command radio',
							value:`Name: Radio
            Description: Plays radio in voice channel / Stage`,
						},
          	{
							label: 'forceplay',
							description: 'Description of command forceplay',
							value:`Name: Forceplay
            Description: Forcly changes radio and Lo-Fi`,
						},
          	{
							label: 'stop',
							description: 'Description of command stop',
							value:`Name: Stop
            Description: Stops whatever is played by Himal`,
						},
					),
			);
      const embed = new MessageEmbed()
      .setColor('GREEN')
      .setAuthor("Himal's Help Menu", interaction.user.displayAvatarURL())
      .setDescription("The available commands are provided below. To view the command description, just type `/` symbol and the command name, its description will show up.\n\n Select the command from the drop-down pannel \n\n*Note: Himal uses slash commands, it doesn't have a prefix*")
      .setFooter('An open sourced project by Grizz1e')
      .setTimestamp()

    const filter = (interaction) => interaction.isSelectMenu;
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
    });
    
    collector.on('collect', async (collected) => {
      const value = collected.values[0];
      collected.deferUpdate();
      collected.channel.send({ephemeral: true , content:value})
    })

  await interaction.reply({embeds: [embed], components: [row] });

	}

 }
  
