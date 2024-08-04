const { Schema, model } = require('mongoose');

const knightLevelSchema = new Schema({
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
        default: '1268229387149643827'
    }
});

module.exports = model('knightlevel', knightLevelSchema);