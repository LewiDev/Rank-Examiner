const KnightLevel = require("../models/KnightLevel");
const MageLevel = require('../models/MageLevel')

module.exports = async (type, userId, guildId) => {
    let data
    if (type === 'knight') {
        data = await KnightLevel.findOne({userId:userId, guildId:guildId})
    } else {
        data = await MageLevel.findOne({userId:userId, guildId:guildId})
    }
    return data
}