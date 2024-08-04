const { roles } = require('../../config.json')

module.exports = (rank, type, guild, object) => {
    knightMap = new Map([
        [5, roles['Novice Knight']],
        [10, roles['Advanced Knight']],
        [25, roles['Hedge Knight']],
        [50, roles['Knight\'s Vanguard']],
        [75, roles['Landed Knight']],
        [100, roles['Paladin Knight']],
        [200, roles['Veteran Knight']],
        [400, roles['Pureblood Knight']],
    ]);

    mageMap = new Map([
        [5, roles['Rookie Mage']],
        [10, roles['Intermediate Mage']],
        [25, roles['Advanced Mage']],
        [50, roles['First-Class Mage']],
        [75, roles['Holy Mage']],
        [100, roles['Demon Mage']],
        [200, roles['Imperial Mage']],
        [400, roles['Divine Mage']],
    ]);
    return object ? type === 'knight' ? guild.roles.cache.find(role => role.id === knightMap.get(rank)) : guild.roles.cache.find(role => role.id === mageMap.get(rank)) : type === 'knight' ? knightMap.get(rank) : mageMap.get(rank);
}