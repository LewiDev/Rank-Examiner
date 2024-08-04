const getLeaderboardAttachment = require("../../utils/getLeaderboardAttachment");
const getSelected = require("../../utils/getSelected");

module.exports = {
    name: 'lb',
    description: 'shows the leaderboard!',
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @param {GuildMember} userObj
     * @returns 
     */

    callback: async (client, interaction) => {

        await interaction.deferReply();

        const type = getSelected(interaction.member);

        const lb = await getLeaderboardAttachment(type, interaction)
        interaction.editReply({files: [lb]});
    }
}