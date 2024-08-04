const { messages, roles, emojis } = require('../../config.json');
const { Client, Message } = require('discord.js');
const getRankOfOther = require("./getRankOfOther");
const isNewRole = require("./isNewRole");
const getCardAttachment = require('./getCardAttachment');
const getRole = require('./getRole');
const fetchData = require('./fetchData')
const isLiving = require('./isLiving')

/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */


module.exports = async (client, message, type) => {
    const member = message.member;

    const data = await fetchData(type, member.id, message.guild.id);
    data.xp = 0
    data.rank += 1

    const otherRank = await getRankOfOther(type, member.id, message.guild.id);

    if (data.rank >= 400 && !isLiving(member)) {
        if (otherRank >= 400) {
            console.log(otherRank + 'Living')
            member.roles.add(roles['Living Grimoir'])
            data.role = roles['Living Grimoir'];
            let card = await getCardAttachment(type, member, data)
            message.reply({content: messages['rankUpToLiving'], files:[card]});
            data.save();
            data = await fetchData((type === 'knight' ? 'mage' : 'knight'))
            data.role = roles['Living Grimoir'];
            data.save()
            return;
        }  

        if (!otherRank) {
            let card = await getCardAttachment(type, member, data)
            console.log(otherRank + 'not other')
            let roleName = (await message.guild.roles.cache.get(data.role)).name
            message.reply({content: messages['rankUpAbove400NotLiving'].replace("{role} {role_emoji}", roleName + ' ' + emojis[roleName]), files:[card]});
            data.save();
            return;
        }

        if (otherRank < 400) {
            let card = await getCardAttachment(type, member, data)
            console.log(otherRank + 'other less than 400')
            let roleName = (await message.guild.roles.cache.get(data.role)).name
            message.reply({content: messages['rankUpAbove400NotLiving'].replace("{role} {role_emoji}", roleName + ' ' + emojis[roleName]), files:[card]});
            data.save();
            return;
        } 
    }

    if(isLiving(member)) {
        let card = await getCardAttachment(type, member, data)
        message.reply({content: messages['rankUpAbove400Living'], files:[card]});
        data.save();
        return;
    }

    if(isNewRole(data.rank)) {
        let newRole = getRole(data.rank, type, message.guild, false);
        member.roles.add(newRole);
        data.role = newRole;
        let roleName = (await message.guild.roles.cache.get(data.role)).name
        let card = await getCardAttachment(type, member, data)
        message.reply({content: messages['rankUpWithNewRole'].replace("{role} {role_emoji}", roleName + ' ' + emojis[roleName]), files:[card]});
        data.save();
        return
    }

    let card = await getCardAttachment(type, member, data)
    message.reply({content: messages['rankUp'], files:[card]});
    data.save();
    return
}