const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, StreamType } = require("@discordjs/voice");
const Player = createAudioPlayer();

let row = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setLabel('Buy me a coffee')
      .setStyle('LINK')
      .setURL('https://buymeacoffee.com/KavyaBot')
      .setEmoji('882685341444743198'),
    new MessageButton()
      .setLabel('Support')
      .setStyle('LINK')
      .setURL('https://discord.com/invite/nZRMdQeK6m')
      .setEmoji('882684602639081492'),
    new MessageButton()
      .setLabel('Invite Me')
      .setStyle('LINK')
      .setURL('https://bit.ly/2UUusC8')
      .setEmoji('882683102890197062')
  )

async function play(interaction, url, stName) {
  const vc = interaction.member.voice
  const channel = vc.channel

  const cncsn = await getVoiceConnection(interaction.guildId);

  if (cncsn && cncsn.receiver.connectionData.speaking && interaction.commandName !== 'forceplay') return interaction.reply({ content: `I'm currently being used in <#${channel.id}>`, ephemeral: true })

  if (!channel) return interaction.reply({ content: "You're not in a Voice/Stage Channel", ephemeral: true });

  if (!channel.joinable) return interaction.reply({ content: "I can't join the channel you're connected to", ephemeral: true });
  if (!channel.speakable) return interaction.reply({ content: "I can't speak in the channel you're connected to", ephemeral: true });
  if (channel.full) return interaction.reply({ content: "The Voice Channel you're currently in is full", ephemeral: true });

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  const audioPlayer = createAudioPlayer();

  const resource = createAudioResource(url);

  const subscription = connection.subscribe(audioPlayer);

  audioPlayer.play(resource);

  let embed = new MessageEmbed()
    .setColor('GREEN')
    .setDescription(`**▶️ | Started playing ${stName} in <#${channel.id}>**${url === 'https://ec2.yesstreaming.net:1915/stream' ? '' : '\n**[Add your own station](https://www.radio-browser.info/#/add)**'}`)
  interaction.reply({
    embeds: [embed], components: [row]
  });
}

async function stop(interaction) {
  if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
  else if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
  else if (!interaction.guild.me.voice.channelId) return await interaction.reply({ content: "I'm not playing anything!", ephemeral: true });
  else {
    let embed = new MessageEmbed()
      .setColor('RED')
      .setDescription(`**⏹️ | Stopped playing in <#${interaction.guild.me.voice.channelId}>**`)

    const connection = await getVoiceConnection(interaction.guildId);
    if (!connection) return interaction.reply({ content: `THere aren't any active Voice connection in this Server`, ephemeral: true })
    await connection.destroy();
    return await interaction.reply({ embeds: [embed], components: [row] });
  }
}

async function rowMaker() {
  return row;
}
module.exports = { play, stop, rowMaker };