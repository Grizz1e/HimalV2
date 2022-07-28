const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Starts playing Lo-fi radio station!'),
  async execute(interaction, client) {
    const playCheck = await client.function.canPlayInVC(interaction);
    if (!playCheck.canPlay) {
      return interaction.reply({ content: ":x: | Sorry, Cannot complete your request at the moment\nReason: " + playCheck.reason, ephemeral: true })
    }
    const vc = interaction.member.voice.channel

    const player = createAudioPlayer();

    const connection = joinVoiceChannel({
      channelId: vc.id,
      guildId: interaction.guildId,
      selfDeaf: true,
      adapterCreator: interaction.guild.voiceAdapterCreator
    })

    const resource = createAudioResource(process.env.LOFI, {
      inputType: StreamType.Arbitrary
    })
    const subscription = connection.subscribe(player);
    player.play(resource);
    let embed = new EmbedBuilder()
      .setColor('#99ff66')
      .setDescription(`**▶️ | Started playing Lo-fi Beats in <#${vc.id}>**`)
    interaction.reply({ embeds: [embed], components: [await client.function.createButtons()] })
  },
};