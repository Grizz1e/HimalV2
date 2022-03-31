const {
  SlashCommandBuilder
} = require('@discordjs/builders');
const axios = require('axios');
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('forceplay')
    .setDescription('Allows you to force play the given station')
    .addStringOption((option) =>
      option.setName('station')
      .setDescription('Name of the radio station')
      .setRequired(false),
    ),
  async execute(interaction, client) {
    // if not in voice channel, return error
    if (!interaction.member.voice.channelId) return interaction.reply({
      content: "You are not in a voice channel!",
      ephemeral: true
    });

    // if not in a same voice channel, return error
    else if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return interaction.reply({
      content: "You are not in my voice channel!",
      ephemeral: true
    });

    // if bot not in vc, return error
    else if (!interaction.guild.me.voice.channelId) return interaction.reply({
      content: "I'm not playing anything!",
      ephemeral: true
    });

    const vc = interaction.member.voice
    if (interaction.member.roles.cache.some(role => role.name.toLowerCase() === 'dj') || vc.channel.permissionsFor(interaction.member).has("MANAGE_CHANNELS")) {
      if (interaction.options.getString('station') === null) {
        client.func.play(interaction, process.env.LOFI_1, 'Lo-fi Beats')
      } else {
        axios.get(
          `http://all.api.radio-browser.info/json/stations/byname/${encodeURIComponent(interaction.options._hoistedOptions[0].value)}?limit=20`
        ).then(async function (response) {
          let data = response.data;
          if (data.length < 1) return interaction.reply({
            content: 'No radio station found with that name',
            ephemeral: true
          })
          else {
            if (data.length === 1) client.func.play(interaction, data[0].url_resolved, data[0].name, false)
            else {
              let row = new MessageActionRow()
                .addComponents(
                  new MessageButton()
                  .setCustomId('previous')
                  .setStyle('PRIMARY')
                  .setEmoji('◀️'),

                  new MessageButton()
                  .setCustomId('select')
                  .setStyle('SUCCESS')
                  .setEmoji('✅'),

                  new MessageButton()
                  .setCustomId('next')
                  .setStyle('PRIMARY')
                  .setEmoji('▶️'),

                  new MessageButton()
                  .setCustomId('close')
                  .setStyle('DANGER')
                  .setEmoji('✖️')
                )
              let i = 0
              let embed = new MessageEmbed()
                .setAuthor({
                  name: 'Select the Radio Station',
                  iconURL: client.user.displayAvatarURL()
                })
                .setTitle(data[0].name)
                .setURL(data[0].homepage)
                .setThumbnail(data[0].favicon.split(" ").join("%20"))
                .setFooter({
                  text: '◀️ : Previous, ✅ : Select, ▶️ : Next, ❌ : Close'
                })
              let intr = await interaction.reply({
                embeds: [embed],
                components: [row]
              })
              try {
                let filter = u => u.user.id === interaction.member.id
                while (true) {
                  let collector = await interaction.channel.awaitMessageComponent({
                    filter,
                    time: 30000,
                    componentType: "BUTTON"
                  });
                  if (collector.user.id === interaction.member.id) {
                    if (collector.customId === 'close') return interaction.deleteReply(intr)
                    else if (collector.customId === 'select') {
                      await interaction.deleteReply(intr)
                      return client.func.play(interaction, data[i].url_resolved, data[i].name, true)
                    } else if (collector.customId === 'previous') {
                      i--
                      if (i < 0) i = data.length - 1
                      embed.setTitle(data[i].name)
                        .setURL(data[i].homepage)
                        .setThumbnail(data[i].favicon)
                      await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                      })
                      await collector.deferUpdate()
                    } else if (collector.customId === 'next') {
                      i++
                      if (i === data.length) i = 0
                      embed.setTitle(data[i].name)
                        .setURL(data[i].homepage)
                        .setThumbnail(data[i].favicon)
                      await interaction.editReply({
                        embeds: [embed],
                        components: [row]
                      })
                      await collector.deferUpdate()
                    }
                  }
                }
              } catch (err) {
                return console.log(err)
              }
            }
          }
        })
      }
    } else return interaction.reply({
      content: "You don't have `Manage Channel` permission nor do you have a role named `DJ`",
      ephemeral: true
    })

  },
};