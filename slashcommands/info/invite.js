const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const owner = ''//owner id
module.exports = {
  name: 'invite',
  description: 'invite bot',
  run: async function(client, interaction, args) {
    let color = db1.get(`color_${interaction.guild.id}`) || "RANDOM";
    const row = new MessageActionRow()

      .addComponents(
        new MessageButton()
          .setEmoji('✔️')
          .setLabel('Click Here to Invite Bot')
          .setURL(`رابط البوت`)
          .setStyle('LINK'),
      )

      const embed = new MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setDescription(`
      - Ping \`${client.ws.ping}\`
      - Servers \`${client.guilds.cache.size}\`
      - Creator : <@${owner}> 
      - Users \`${client.users.cache.size}\`
      `)
      .setColor(color)

    await interaction.followUp({ embeds: [embed], components: [row] })

  }
}
