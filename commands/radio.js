const {
  SlashCommandBuilder
} = require('@discordjs/builders');
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('radio')
    .setDescription('Plays the stream from provided Radio station!')
    .addStringOption((option) =>
      option.setName('station')
      .setDescription('Name of the radio station')
      .setRequired(true),
    ),
  async execute(interaction, client) {
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
            .setAuthor('Select the Radio Station', client.user.displayAvatarURL())
            .setTitle(data[0].name)
            .setURL(data[0].homepage)
            .setThumbnail(data[0].favicon.split(" ").join("%20"))
            .setFooter('◀️ : Previous, ✅ : Select, ▶️ : Next, ❌ : Close')
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
  },
};