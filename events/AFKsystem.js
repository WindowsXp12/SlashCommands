const { Message, MessageEmbed } = require('discord.js')
const db = require('../models/afkModel')
const client = require('../index')
const db1 = require('pro.db')
const moment = require('moment')



client.on('messageCreate', async message => {
    
        if (message.author.bot) return;
        let color = db1.get(`color_${message.guild.id}`) || "RANDOM";
        if (message.mentions.members.size) {
            message.mentions.members.forEach((m)=> {
                db.findOne({GuildId: message.guild.id, UserId: m.id},async(err,data) => {
                    if(err) return message.reply(err)
                    if (data) {
                    let embed = new MessageEmbed()
            .setColor(color)
            .addField(`${m.user.username} in afk `,`<t:${data.Time}:R>`)
            .addField(`Status :`,`${data.Status}`)
            .setFooter(client.user.username, client.user.avatarURL({dynamic:true}))
                message.reply({embeds:[embed]})
                    }
                })
            })
        }
    
    
})