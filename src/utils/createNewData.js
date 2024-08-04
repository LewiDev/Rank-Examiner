const KnightLevel = require("../models/KnightLevel");
const MageLevel = require('../models/MageLevel')

module.exports = async (type, userId, guildId) => {
    const data = type === 'knight' ? new KnightLevel({userId, guildId}).save() : new MageLevel({userId, guildId})
    return data
}