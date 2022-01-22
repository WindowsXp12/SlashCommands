const { Client, CommandInteraction, MessageEmbed, GuildEmojiRoleManager } = require('discord.js')
const db = require('../../models/afkModel')
const db1 = require('pro.db')

module.exports = {
    name: 'afkremove',
    description: 'afk system',
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        if (interaction.user.bot) return;
        let color = db1.get(`color_${interaction.guild.id}`) || "RANDOM";
        try {
            
            await db.deleteOne({GuildId: interaction.guildId, UserId: interaction.user.id})
                    let embed = new MessageEmbed()
                    .setAuthor(interaction.user.username, interaction.user.avatarURL({dynamic:true})).setColor(color).setDescription(`Your Afk Status has been removed`)
                    await interaction.followUp({embeds: [embed]})
        } catch(err) {
            console.log(err)
        }

    }
}