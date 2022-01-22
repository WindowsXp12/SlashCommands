const { Client, CommandInteraction } = require('discord.js')
const ms = require("ms");


module.exports = {
    name: 'timeout',
    description: 'give timeout to user',
    options: [
        {
            name: 'user',
            description: 'user you want to give timeout',
            type: 'USER',
            required: true
        },
        {
            name: 'time',
            description: 'time of timeout',
            type: 'STRING',
            required: true
        },
        {
            name: 'reason',
            description: 'timeout reason',
            type: 'STRING',
            required: true
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
     const user = interaction.options.getUser('user')
     const  time = interaction.options.getString('time')
     const reason = interaction.options.getString('reason')
     const member = interaction.guild.members.cache.get(user.id)
     const timems = ms(time);
     if (!timems) return interaction.followUp({ content: 'enter a valid time' })
     member.timeout(timems, reason);
     interaction.followUp({ content: `${user} has been timeouted for ${time}! with reason : ${reason}` })

    }
}