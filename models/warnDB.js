const { Schema, model } = require('mongoose');

module.exports = model(
    "warnings",
    new Schema({
        GuildID: String,
        UserID: String,
        UserTag: String,
        Content: Array,
    })
);