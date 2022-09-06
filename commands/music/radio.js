const { EmbedBuilder, ComponentType, SlashCommandBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('radio')
    .setDescription('Plays the given radio station')
    .addStringOption(option =>
      option.setName('station')
        .setDescription('Radio station to play')
        .setRequired(true)),
  async execute(interaction, client, player) {
    let radioIcon = 'https://icons.iconarchive.com/icons/google/noto-emoji-objects/1024/62807-radio-icon.png'
    let canPlay = await client.function.canPlayInVC(interaction)
    if (!canPlay.canPlay) return await interaction.reply({ content: `❌ | ${canPlay.reason}`, ephemeral: true })
    await interaction.deferReply()
    const query = interaction.options.getString("station");
    let { data } = await axios.get(`https://nl1.api.radio-browser.info/json/stations/byname/${encodeURIComponent(query)}`)

    if (data.length < 1) {
      return await interaction.followUp({ content: `❌ | No radio station was found` })
    } else if (data.length === 1) {
      const track = await player.search(data[0].url_resolved, {
        requestedBy: interaction.user
      }).then(x => x.tracks[0]);
      track.title = data[0].name
      track.thumbnail = !!data[0].favicon ? data[0].favicon : radioIcon
      const queue = player.createQueue(interaction.guild, {
        leaveOnEmpty: false,
        metadata: {
          channel: interaction.channel
        }
      });
      try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
      } catch {
        queue.destroy()
        return await interaction.followUp({ content: "❌ | Could not join your voice channel!", ephemeral: true });
      }
      await queue.play(track)
      let addedEmbed = new EmbedBuilder()
        .setColor('#99ff66')
        .setDescription(`⏱️ | Added track **${track.title}** to the queue!`)
      return await interaction.followUp({ embeds: [addedEmbed] });
    } else {
      let url, title, thumbnail, buttons = await client.function.createRadioButtons(), i = 0
      let embed = new EmbedBuilder()
        .setAuthor({ name: "Select the Radio Station", iconURL: client.user.displayAvatarURL() })
        .setFooter({ text: "◀️ : Previous, ✅ : Select, ▶️ : Next, ❌ : Close" })
        .setTitle(data[0].name)
        .setURL(data[0].homepage)
        .setThumbnail(data[0].favicon || radioIcon)
      await interaction.followUp({ embeds: [embed], components: [buttons] })
      try {
        let filter = u => u.user.id === interaction.member.id;

        while (true) {
          let collector = await interaction.channel.awaitMessageComponent({
            filter,
            time: 30000,
            componentType: ComponentType.Button
          })
          if (collector.customId === 'close') {
            return interaction.deleteReply(intr)
          } else if (collector.customId === 'select') {
            url = data[i].url_resolved
            title = data[i].name
            thumbnail = data[i].thumbnail
            await collector.deferUpdate()
            break;
          } else if (collector.customId === 'previous') {
            i--
            if (i < 0) {
              i = data.length - 1
            }
            embed.setTitle(data[i].name)
              .setURL(data[i].homepage)
              .setThumbnail(data[i].favicon || radioIcon)
            await interaction.editReply({
              embeds: [embed],
              components: [buttons]
            })
            await collector.deferUpdate()

          } else if (collector.customId === 'next') {
            i++
            if (i === data.length) {
              i = 0
            }
            embed.setTitle(data[i].name)
              .setURL(data[i].homepage)
              .setThumbnail(data[i].favicon || radioIcon)
            await interaction.editReply({
              embeds: [embed],
              components: [buttons]
            })
            await collector.deferUpdate()
          }

        }
      } catch (err) {
        return
      }
      let addedEmbed = new EmbedBuilder()
        .setColor('#99ff66')
        .setDescription(`⏱️ | Added track **${title}** to the queue!`)
      await interaction.editReply({ embeds: [addedEmbed], components: [] });
      const track = await player.search(url, {
        requestedBy: interaction.user
      }).then(x => x.tracks[0]);
      if (typeof track === 'undefined') {
        return await interaction.followUp({ content: `❌ | Looks like the stream URL is broken!\nURL: ${url}\nDoes this URL work? If it does, please join our support server and let us know`, ephemeral: true })
      }
      track.title = title
      track.thumbnail = !!thumbnail ? thumbnail : radioIcon

      const queue = player.createQueue(interaction.guild, {
        leaveOnEmpty: false,
        metadata: {
          channel: interaction.channel
        }
      });
      try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
      } catch {
        queue.destroy()
        return await interaction.followUp({ content: "❌ | Could not join your voice channel!", ephemeral: true });
      }
      return await queue.play(track)
    }
  }
}