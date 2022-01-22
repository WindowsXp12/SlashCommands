const { MessageEmbed, Discord, Collection } = require('discord.js');
const db = require('pro.db');
const client = require('../index.js');


client.on('channelCreate', async (channel) => {
    let color = db.get(`color_${channel.guild.id}`) || "RED";
        let room = await db.get(`log_${channel.guild.id}`)
        if (room) {
    let embed = new MessageEmbed()
    .setAuthor(channel.guild.name, channel.guild.iconURL({dynamic:true}))
    .addField(`New Channel Has Been created `,`${channel}`,true)
    .setTimestamp()
    .setColor(color)
    .setFooter(channel.guild.name, channel.guild.iconURL({dynamic:true}))
    channel.guild.channels.cache.get(room).send({ embeds: [embed] });
        } else {
            return;
        }
    
})