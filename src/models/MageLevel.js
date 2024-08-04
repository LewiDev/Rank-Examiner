const { Schema, model } = require('mongoose');

const mageLevelSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    xp: {
        type: Number,
        default: 0,
    },
    rank: {
        type: Number,
        default: 1,
    },
    role: {
        type: String,
        default: '1268131583777439825',
    }
});

module.exports = model('magelevel', mageLevelSchema);