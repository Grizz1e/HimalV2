const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client, player) {

    if (!interaction.inGuild()) return interaction.reply({ content: "Nice try :smirk:", ephemeral: true });
    if (interaction.isButton() && interaction.customId === 'play') {
      let components = interaction.message.components
      let playButton = components[1].components[0]
      playButton.data.disabled = true
      await interaction.message.edit({ embeds: interaction.message.embeds, components: components })
      let cmd = client.commands.get("lofi");
      return cmd.execute(interaction, client, player)
    }
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction, client, player);
    } catch (error) {
      console.log(error)
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      });
    }
  },
};