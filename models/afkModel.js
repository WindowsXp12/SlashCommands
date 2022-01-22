const { Schema, model } = require('mongoose')

module.exports = new model('AFK', new Schema({
    GuildId : String,
    UserId: String,
    Status: String,
    Time: Number,
}))