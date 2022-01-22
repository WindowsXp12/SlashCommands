const { Client, CommandInteraction, MessageEmbed, DiscordAPIError } = require('discord.js')
const db = require('../../models/warnDB')
const db1 = require('pro.db')

module.exports = {
    name:'warnings',
    description: 'warnings system',
    options: [
        {
            name: 'add',
            description: 'Add Warn',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'user you want to warn',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'reason',
                    description: 'warn reason',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: 'list',
            description: 'warnings list',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'user you want to view warns',
                    type: 'USER',
                    required: true,
                },
            ],
        },
        {
            name: 'remove',
            description: 'remove warn',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'user you want to remove warn',
                    type: 'USER',
                    required: true,
                },
                {
                    name: 'id',
                    description: 'warn id',
                    type: "NUMBER",
                    required: true,
                }
            ],
        },
        {
            name: 'clear',
            description: 'clear warnings',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'user you want to warn',
                    type: 'USER',
                    required: true,
                },
            ],
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async(client, interaction) => {
        const Sub = interaction.options.getSubcommand(["add","list","remove","clear"])
        const Target = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
        const WarnId = interaction.options.getNumber('id') + 1;
        const WarnDate = new Date(interaction.createdTimestamp).toLocaleDateString()
        let color = db1.get(`color_${interaction.guild.id}`) || "RANDOM";
        if (Sub === "add") {
            db.findOne({ GuildId : interaction.guildId, UserId: Target.id, UserTag: Target.username }, async(err, data) => {
                if (err) throw err;
                if (!data) {
                    data = new db({
                        GuildId: interaction.guildId,
                        UserId: Target.id,
                        UserTag: Target.username,
                        Content: [
                            {
                                AuthorId : interaction.user.id,
                                AuthorTag : interaction.user.tag,
                                Reason: reason,
                                Date: WarnDate,
                            }
                        ],
                    })
                } else {
                    const object = {
                        AuthorId : interaction.user.id,
                        AuthorTag : interaction.user.tag,
                        Reason: reason,
                        Date: WarnDate, 
                    }   
                    data.Content.push(object)
                }data.save()
            })
            let embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`Add Warn : ${Target.username}`)
            .addField('** Reason **', `${reason}`)
            .setFooter(`By : ${interaction.user.username}`, interaction.user.avatarURL({dynamic:true}))
            .setTimestamp()
            interaction.followUp({ embeds: [embed] })
        } else if (Sub === "list"){
            db.findOne({ GuildId : interaction.guildId, UserId: Target.id, UserTag: Target.username }, async (err, data) => {   
                if(err) throw err;
                if (data) {
                    console.log(data)
                    interaction.followUp({ embeds: [new MessageEmbed()
                    .setTitle(`Warn List : ${Target.username}`)
                    .setColor(color)
                    .setDescription(`${data.Content.map(
                        (w,i) => `** Id ** : ${i + 1} \n ** By ** : ${w.AuthorTag} \n ** Date **: ${w.Date} \n ** Reason **: ${w.Reason  ? w.Reason : "No Reason Provided"} \n`
                    ).join(" ")}`)
                    .setFooter(`By : ${interaction.user.username}`, interaction.user.avatarURL({dynamic:true}))
            .setTimestamp()
                    ] })
                } else {
                    interaction.followUp({ embeds: [new MessageEmbed()
                        .setTitle(`Warn List : ${Target.username}`)
                        .setDescription(`${Target} Has No Warnings`)
                        .setFooter(`By : ${interaction.user.username}`, interaction.user.avatarURL({dynamic:true}))
            .setTimestamp()
                    ] })
                }

            })

        } else if (Sub === "remove"){
            db.findOne({ GuildId : interaction.guildId, UserId: Target.id, UserTag: Target.username }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    data.Content.splice(WarnId, 1)
                    interaction.followUp({ embeds: [ new MessageEmbed()
                        .setColor(color)
                        .setTitle(`Warn Remove : ${Target.username}`)
                        .setDescription(`${Target} warn id : ${WarnId} has been removed`)
                        .setFooter(`By : ${interaction.user.username}`, interaction.user.avatarURL({dynamic:true}))
            .setTimestamp()
                    ] })
                    data.save()
                } else {
                    interaction.followUp({ embeds: [new MessageEmbed()
                        .setTitle(`Warn List : ${Target.username}`)
                        .setDescription(`${Target} Has No Warnings`)
                        .setFooter(`By : ${interaction.user.username}`, interaction.user.avatarURL({dynamic:true}))
            .setTimestamp()
                    ] })
                }
            })
        }  else if (Sub === "clear"){
            db.findOne({ GuildId : interaction.guildId, UserId: Target.id, UserTag: Target.username },async(err,data) => {
            if (err) throw err;
            if (data) {
                await db.findOneAndDelete({ GuildId : interaction.guildId, UserId: Target.id, UserTag: Target.username })
                interaction.followUp({ embeds : [new MessageEmbed()
                .setColor(color)
                .setTitle(`Clear warnings : ${Target.username}`)
                .setDescription(`done clear warnings for ${Target}, ${Target} has no warnings now`)
                .setFooter(`By : ${interaction.user.username}`, interaction.user.avatarURL({dynamic:true}))
            .setTimestamp()
                ]})
            }  else {
                interaction.followUp({ embeds: [new MessageEmbed()
                    .setTitle(`Warn List : ${Target.username}`)
                    .setDescription(`${Target} Has No Warnings`)
                    .setFooter(`By : ${interaction.user.username}`, interaction.user.avatarURL({dynamic:true}))
            .setTimestamp()
                ] })
            }
                   
            })
        } 



    }
}