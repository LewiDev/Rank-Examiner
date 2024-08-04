const { AttachmentBuilder } = require("discord.js");
const { Font, LeaderboardBuilder } = require('canvacord');
const KnightLevel = require("../models/KnightLevel");
const MageLevel = require("../models/MageLevel");

module.exports = async (type, interaction) => {
    Font.loadDefault();

    let allRanks = type === 'mage' ? await MageLevel.find({ guildId: interaction.guild.id }).select('-_id userId level xp role') : await KnightLevel.find({ guildId: interaction.guild.id }).select('-_id userId rank xp role')
    
    allRanks.sort((a, b) => {
        if (a.rank === b.rank) {
            return b.xp - a.xp;
        } else {
            return b.rank - a.rank;
        }
    });

    const lbdata = [];

    for (const r of allRanks) {
        let role = interaction.guild.roles.cache.get(r.role);
        let user = await interaction.guild.members.fetch(r.userId);
        let currentRank = allRanks.findIndex((rnk) => rnk.userId === r.userId) + 1;

        if (!user || !role) continue;

        lbdata.push({
            avatar: user.displayAvatarURL({ format: 'png' }),
            username: role.name,
            displayName: user.displayName,
            rank: r.rank,
            xp: r.xp,
            rank: currentRank,
        });
    }

    while (lbdata.length < 7) {
        lbdata.push({
            avatar: interaction.guild.iconURL(),
            username: '',
            displayName: 'N/A',
            rank: 0,
            xp: 0,
            rank: lbdata.length + 1
        })
    }

    const lb = new LeaderboardBuilder()
        .setHeader({
            title: (type === 'mage' ? "Mage Leaderboard" : "Knight Leaderboard"),
            image: interaction.guild.iconURL(), // Ensure this is a valid image URL
            subtitle: "View your competition",
        })
        .setPlayers(lbdata)
        .setBackground((type === 'mage' ? 'src/img/LeaderboardM.png' : 'src/img/LeaderboardK.png')); // Ensure this is the correct path to your image

    lb.setVariant("default");
    
    const image = await lb.build({ format: "png" });
    const attachment = new AttachmentBuilder(image, {name: 'lb.png'});
    return attachment;
}