const KnightLevel = require("../models/KnightLevel");
const MageLevel = require('../models/MageLevel')

module.exports = async (type, userId, guildId) => {
    if (type === 'knight') {
        const data = await MageLevel.findOne({userId, guildId});
        return data.rank
    } else {
        const data = await KnightLevel.findOne({userId, guildId});
        return data.rank
    }
}