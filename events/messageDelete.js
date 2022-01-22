const { MessageEmbed, Discord, Collection } = require('discord.js');
const db = require('pro.db');
const client = require('../index.js');


client.on('messageDelete', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    
        let color = db.get(`color_${message.guild.id}`) || "RED";
        let channel = await db.get(`log_${message.guild.id}`)
        if (channel) {
            const embed = new MessageEmbed()
            .setTitle('New Message Deleted')
            .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
            .addField('** Message Content ** ',  ` \`\`\`diff\n- ${message.content}\`\`\` ` , true)
            .addField(`By : `, `${message.author}` , true)
            .addField('In : ', `${message.channel}` , true)
            .setColor(color)
            .setFooter(client.user.username, client.user.avatarURL({dynamic: true}))
            message.guild.channels.cache.get(channel).send({ embeds: [embed] });
        } else {
            return;
        }
    
});
