const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js");
const { readdirSync } = require("fs");

const db = require('pro.db');

module.exports = {
    name: "set-channel",
    description: "Set the channel where the bot will send the ghost pings information",
    type: 'CHAT_INPUT',
    userPermission: ['ADMINISTRATOR'],
    options: [
        {
            name: 'channel',
            description: 'The channel where the bot will send the ghost pings information',
            type: 'CHANNEL',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");

        


        db.set(`log_${interaction.guild.id}`, channel.id)
        
        let color = db.get(`color_${interaction.guild.id}`) || "RANDOM";

    const embed = new MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
        .setDescription(`${channel} has been setting a logs room`)
        .setColor(color)

        return interaction.followUp({ embeds: [embed] })
    },
};