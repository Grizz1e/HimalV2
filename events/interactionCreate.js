module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client, player) {
    if (interaction.isButton()) {
      if (interaction.customId === 'play') {
        client.func.play(interaction, Date.now() % 2 === 0 ? process.env.LOFI_1 : process.env.LOFI_2, 'Lo-fi Beats')
      } else return;
    }
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, client, player);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  },
};
