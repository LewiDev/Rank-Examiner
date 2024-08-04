const { messages, roles, emojis } = require('../../config.json');
const { Client, Message } = require('discord.js');
const getSelected = require('../utils/getSelected');
const fetchData = require('../utils/fetchData');
const createNewData = require('./createNewData');
const getRandomXp = require('./getRandomXp');
const calculateLevelXP = require('./calculateLevelXP');
const handleRankUp = require('./handleRankUp')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */

module.exports = async (client, message) => {
    const member = message.member;
    const type = getSelected(member);

    if (type === 'knight') {
        const data = await fetchData(type, member.id, message.guild.id);
        if (!data) return await createNewData(type, member.id, message.guild.id).save();
        
        data.xp += getRandomXp()
        if (data.xp >= calculateLevelXP(data.rank)) return handleRankUp(client, message, getSelected(message.member))
    };

    if (type === 'mage') {
        const data = await fetchData(type, member.id, message.guild.id);
        if (!data) return await createNewData(type, member.id, message.guild.id).save();

        data.xp += getRandomXp()
        if (data.xp >= calculateLevelXP(data.rank)) return handleRankUp(client, message, getSelected(message.member))
    };
}