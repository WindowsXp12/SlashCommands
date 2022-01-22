
const { Schema, model } = require('mongoose');

module.exports = model(
    "warningsDB",
    new Schema({
        userId: String,
        guildId: String,
        moderatorId: String,
        reason: String,
        timestamp: Number,
    })
);