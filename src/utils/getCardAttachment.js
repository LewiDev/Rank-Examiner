const { AttachmentBuilder } = require("discord.js");
const { Font, RankCardBuilder } = require('canvacord');
const KnightLevel = require("../models/KnightLevel");
const MageLevel = require("../models/MageLevel");
const calculateLevelXP = require('../utils/calculateLevelXP')

module.exports = async (type, member, data) => {
    Font.loadDefault();

    let allRanks = type === 'knight' ? await KnightLevel.find({ guildId: member.guild.id }).select('-_id userId rank xp') : await MageLevel.find({ guildId: member.guild.id }).select('-_id userId rank xp');
    let bg = type === 'knight' ? 'src/img/Knight.png' : 'src/img/Mage.png';
    let role = member.guild.roles.cache.find(role => role.id === data.role);

    allRanks.sort((a, b) => {
        if (a.rank === b.rank) {
            return b.xp - a.xp;
        } else {
            return b.rank - a.rank;
        }
    });

    let currentRank = allRanks.findIndex((rnk) => rnk.userId === member.id) + 1;

    console.log(data.rank)

    const rankCard = new RankCardBuilder()
    .setAvatar(member.displayAvatarURL({ format: 'png' }))
    .setRank(currentRank)
    .setUsername(role.name)
    .setLevel(data.rank)
    .setCurrentXP(data.xp)
    .setRequiredXP(calculateLevelXP(data.rank))
    .setBackground('#38343c')
    .setBackground(bg)
    .setOverlay(0)
    .setDisplayName(member.displayName)
    rankCard.setTextStyles({
        level: "RANK :", // Custom text for the level
        xp: "XP :", // Custom text for the experience points
        rank: "LEADERBOARD :", // Custom text for the rank
    });
    rankCard.setStyles({
        progressbar: {
            thumb: {
                style: {
                    backgroundColor: "#70dd99",
                },
            },
        },
    });
    // Note: setDiscriminator method is removed

    const rankCardData = await rankCard.build({ format: 'png' });

    const attachment = new AttachmentBuilder(rankCardData, { name: 'rank.png' });
    return attachment;
}