const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getVoiceConnection, VoiceReceiver } = require('@discordjs/voice')

async function createButtons() {
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setURL('https://ko-fi.com/grizz1e')
        .setEmoji('919834131670646824')
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setURL('https://discord.com/invite/nZRMdQeK6m')
        .setEmoji('882684602639081492')
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setURL('https://himal.grizz1e.xyz')
        .setEmoji('882683102890197062')
        .setStyle(ButtonStyle.Link)
    );
  return row;
}
async function canPlayInVC(interaction) {
  const vc = interaction.member.voice;
  const vcChannel = vc.channel
  const vcConnection = getVoiceConnection(interaction.guildId);
  const vcReceiver = new VoiceReceiver(vcConnection);
  if (vcConnection && vcReceiver.speaking && !interaction.forceplay) {
    return {
      canPlay: false,
      reason: "Already Playing"
    }
  } else if (!vcChannel) {
    return {
      canPlay: false,
      reason: "Author Not In VC"
    }
  } else if (!vcChannel.joinable) {
    return {
      canPlay: false,
      reason: "VC Not Joinable"
    }
  } else if (!vcChannel.speakable) {
    return {
      canPlay: false,
      reason: "VC Not Speakable"
    }
  } else if (vcChannel.full) {
    return {
      canPlay: false,
      reason: "VC Full"
    }
  } else {
    return {
      canPlay: true,
      reason: "Criteria Met"
    }
  }
}
async function createRadioButtons() {
  let row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('previous')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('◀️'),

      new ButtonBuilder()
        .setCustomId('select')
        .setStyle(ButtonStyle.Success)
        .setEmoji('✅'),

      new ButtonBuilder()
        .setCustomId('next')
        .setStyle(ButtonStyle.Primary)
        .setEmoji('▶️'),

      new ButtonBuilder()
        .setCustomId('close')
        .setStyle(ButtonStyle.Danger)
        .setEmoji('✖️')
    )
  return row;
}
module.exports = { createButtons, canPlayInVC, createRadioButtons }