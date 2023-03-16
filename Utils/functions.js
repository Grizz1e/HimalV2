const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, PermissionsBitField } = require('discord.js');

async function canPlayInVC(interaction) {
  if (!interaction.member.voice.channelId) {
    return {
      canPlay: false,
      reason: "Author Not In VC"
    }
  } else if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
    return {
      canPlay: false,
      reason: "Author Not In Same VC"
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

async function helpComponentBuilder(includeSelectMenu) {
  let menu = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('helpmenu')
        .setPlaceholder('Nothing selected')
        .addOptions(
          {
            label: '🎶 Music',
            description: 'Commands related to music',
            value: 'help_music',
          },
          {
            label: '🤖 Bot',
            description: 'Commands related to bot',
            value: 'help_bot',
          },
        ),
    )
  let buttons1 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('play')
        .setLabel('Play')
        .setEmoji('▶️')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setEmoji('🤖')
        .setLabel('All Commands')
        .setStyle(ButtonStyle.Link)
        .setURL('https://himal.grizz1e.com/commands'),
      new ButtonBuilder()
        .setEmoji('919834131670646824')
        .setLabel('Ko-Fi')
        .setStyle(ButtonStyle.Link)
        .setURL('https://ko-fi.com/Grizz1e')
    )
  let buttons2 = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setEmoji('882684602639081492')
        .setLabel('Support Server')
        .setStyle(ButtonStyle.Link)
        .setURL('https://himal.grizz1e.com/server'),
      new ButtonBuilder()
        .setEmoji('882683102890197062')
        .setLabel('Invite Me')
        .setStyle(ButtonStyle.Link)
        .setURL('https://himal.grizz1e.com/invite'),
    )
  return [menu, buttons1, buttons2]
}
async function isTrackOwner(track, interaction) {
  return track.requestedBy.id === interaction.user.id
}
async function isDJ(member, channel) {
  return member.roles.cache.some(role => role.name.toLowerCase() === 'dj') || member.permissionsIn(channel).has(PermissionsBitField.Flags.ManageChannels) || channel.members.size < 3
}

module.exports = { canPlayInVC, createRadioButtons, helpComponentBuilder, isTrackOwner, isDJ }