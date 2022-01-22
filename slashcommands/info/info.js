const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'info',
  description: 'View all info',
  cooldown: 10,
  options: [
    {
      name: 'user',
      description: 'the targeted user',
      type: 'USER'
    }
  ],
  run: async function(client, interaction) {
    let color = db1.get(`color_${interaction.guild.id}`) || "RANDOM";
let user = interaction.guild.members.cache.get(args[0]) || interaction.member;
const embed = new MessageEmbed()
.setColor(color)
.setTitle('Info')
.addField(`__**Info**__`, `Username: ${user.user.username}\nID: ${user.id}`)
    .addField(`__**Server Info**__`,`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`)
    await interaction.followUp({embeds: [embed] , ephemeral: true})
  }}
