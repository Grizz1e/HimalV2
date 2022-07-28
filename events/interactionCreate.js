module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.inGuild()) return interaction.reply({ content: "Nice try :smirk:", ephemeral: true });
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      });
    }
  },
};