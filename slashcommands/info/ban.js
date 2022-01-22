const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'ban',
  description: 'Ban Anyone',
  userPermissions: "BAN_MEMBERS",
  options: [
    {
      name: 'user',
      description: 'The User',
      type: 'USER',
      required: true
    },
    {
      name: 'reason',
      description: 'reason',
      type: 'STRING'
    }
  ],

  run: async function(client, interaction, args) {

    let user = interaction.guild.members.cache.get(args[0]);

    if (!user) return interaction.followUp(`User?`)

    let reason = args[1];

    if (!interaction.guild.me.permissions.has('BAN_MEMBERS')) return interaction.followUp(`I Dont Have Permission`)

    if (user.roles.highest.position >= interaction.guild.me.roles.highest.position
      && interaction.member.id !== interaction.guild.ownerId) return interaction.followUp(`I Cant Ban This User`)

    if (user.roles.highest.position >= interaction.user.roles.highest.position
      && interaction.user.id !== interaction.guild.ownerId) return interaction.followUp(`I Cant Ban This User`)

    if (!member.bannable) return interaction.followUp(`I Cant Ban This User`);

    member.ban({ days: 99, reason: reason }).then(() => {

      interaction.followUp({ content:`Done Banned ${user.user.username}`, ephemeral: true})

    })
  },
};
