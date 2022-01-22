const { Client, CommandInteraction, MessageEmbed, GuildEmojiRoleManager } = require('discord.js')
const db = require('../../models/afkModel')
const db1 = require('pro.db')

module.exports = {
    name: 'afkset',
    description: 'afk system',
    options: [
        
                {
                    name: 'status',
                    description: 'set afk status',
                    type: "STRING",
                    required: true,

                }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        if (interaction.user.bot) return;
        let color = db1.get(`color_${interaction.guild.id}`) || "RANDOM";
        try {
            const afkstatus = interaction.options.getString('status')
            await db.findOneAndUpdate({GuildId: interaction.guildId, UserId: interaction.user.id},{Status:afkstatus, Time: parseInt(interaction.createdTimestamp / 1000)},{new:true,upsert:true})
                    let embed = new MessageEmbed()
                    .setAuthor(interaction.user.username, interaction.user.avatarURL({dynamic:true})).setColor(color).setDescription(`Your Afk Status has been setting to ${afkstatus}`)
                    await interaction.followUp({embeds: [embed]})
        } catch(err) {
            console.log(err)
        }

    }
}