const { MessageEmbed, Discord, Collection } = require('discord.js');
const db = require('pro.db');
const client = require('../index.js');


client.on('channelUpdate', async (newchannel,oldchannel) => {
    let color = db.get(`color_${newchannel.guild.id}`) || "RED";
        let room = await db.get(`log_${newchannel.guild.id}`)
        if (room) {
            if (oldchannel.name !== newchannel.name) {
    let embed = new MessageEmbed()
    .setAuthor('Edit Channel Name')
    .addField(`Old Channel Name `,`${oldchannel.name}`,true)
    .addField(`New channel Name :`, `${newchannel.name}`,true)
    .setTimestamp()
    .setColor(color)
    .setFooter(newchannel.guild.name, newchannel.guild.iconURL({dynamic:true}))
    newchannel.guild.channels.cache.get(room).send({ embeds: [embed] });
            }
        } else {
            return;
        }
    
})
