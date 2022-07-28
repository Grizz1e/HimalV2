const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { EmbedBuilder, ComponentType } = require('discord.js');
const { createAudioPlayer, joinVoiceChannel, createAudioResource, StreamType } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('radio')
    .setDescription('Plays the stream from provided Radio station!')
    .addStringOption(option =>
      option.setName('station')
        .setDescription('Name of the radio station')
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const playCheck = await client.function.canPlayInVC(interaction);
    if (!playCheck.canPlay) {
      return interaction.reply({ content: ":x: | Sorry, Cannot complete your request at the moment\nReason: " + playCheck.reason, ephemeral: true })
    }
    const vc = interaction.member.voice.channel
    const player = createAudioPlayer();
    let url, title, dat;

    await axios.get(`https://at1.api.radio-browser.info/json/stations/byname/${encodeURIComponent(interaction.options.getString('station'))}?limit=20`).then(async function (response) {
      dat = response.data;

      if (dat.length < 1) {
        return interaction.reply({ content: 'No radio station found with that name', ephemeral: true });
      } else if (dat.length === 1) {
        url = dat[0].url_resolved;
        title = dat[0].name
      } else {
        let i = 0;
        let embed = new EmbedBuilder()
          .setAuthor({ name: 'Select the Radio Station', iconURL: client.user.displayAvatarURL() })
          .setTitle(dat[0].name)
          .setURL(dat[0].homepage)
          .setThumbnail(dat[0].favicon || 'https://icons.iconarchive.com/icons/google/noto-emoji-objects/1024/62807-radio-icon.png')
          .setFooter({ text: '◀️ : Previous, ✅ : Select, ▶️ : Next, ❌ : Close' })
        let buttons = await client.function.createRadioButtons();
        let intr = await interaction.reply({ embeds: [embed], components: [buttons] })

        try {
          let filter = u => u.user.id === interaction.member.id;

          while (true) {
            let collector = await interaction.channel.awaitMessageComponent({
              filter,
              time: 30000,
              componentType: ComponentType.Button
            });

            if (collector.user.id === interaction.member.id) {
              if (collector.customId === 'close') {
                return interaction.deleteReply(intr)
              } else if (collector.customId === 'select') {
                url = dat[i].url_resolved
                title = dat[i].name
                break;
              } else if (collector.customId === 'previous') {
                i--
                if (i < 0) {
                  i = dat.length - 1
                }
                embed.setTitle(dat[i].name)
                  .setURL(dat[i].homepage)
                  .setThumbnail(dat[i].favicon || 'https://icons.iconarchive.com/icons/google/noto-emoji-objects/1024/62807-radio-icon.png')
                await interaction.editReply({
                  embeds: [embed],
                  components: [buttons]
                })
                await collector.deferUpdate()

              } else if (collector.customId === 'next') {
                i++
                if (i === dat.length) {
                  i = 0
                }
                embed.setTitle(dat[i].name)
                  .setURL(dat[i].homepage)
                  .setThumbnail(dat[i].favicon || 'https://icons.iconarchive.com/icons/google/noto-emoji-objects/1024/62807-radio-icon.png')
                await interaction.editReply({
                  embeds: [embed],
                  components: [buttons]
                })
                await collector.deferUpdate()
              }
            }
          }
        } catch (err) {
          return console.log(err);
        }
      }
    })
    const connection = joinVoiceChannel({
      channelId: vc.id,
      guildId: interaction.guildId,
      selfDeaf: true,
      adapterCreator: interaction.guild.voiceAdapterCreator
    })
    const resource = createAudioResource(url, {
      inputType: StreamType.Arbitrary
    })
    const subscription = connection.subscribe(player);
    player.play(resource);
    let embed = new EmbedBuilder()
      .setColor('#99ff66')
      .setDescription(`**▶️ | Started playing ${title} in <#${vc.id}>**`)
    if (dat.length === 1) {
      interaction.reply({ embeds: [embed], components: [await client.function.createButtons()] })
    } else {
      interaction.editReply({ embeds: [embed], components: [await client.function.createButtons()] })
    }
  },
};