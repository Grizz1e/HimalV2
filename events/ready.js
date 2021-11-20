/* ---Uncomment the code below to make your bot join specific voice channel after reboot--- */

// const {
//   joinVoiceChannel,
//   createAudioPlayer,
//   createAudioResource,
//   getVoiceConnection
// } = require("@discordjs/voice");

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);
    await client.user.setActivity('/play', { type: 'LISTENING' });

    /* ---Uncomment the lines below if you want your bot to join specific voice channel after reboot--- */

    // const guildId = "Guild ID Here"
    // const channelId = "Audio Channel ID Here"
    // let guild = client.guilds.cache.get(guildId)

    // const connection = await joinVoiceChannel({
    //   channelId: channelId,
    //   guildId: guild.id,
    //   adapterCreator: guild.voiceAdapterCreator,
    // });

    // const audioPlayer = createAudioPlayer();

    // const resource = createAudioResource(Date.now() % 2 === 0 ? process.env.LOFI_1 : process.env.LOFI_2);

    // const subscription = connection.subscribe(audioPlayer);

    // audioPlayer.play(resource);
  },
};