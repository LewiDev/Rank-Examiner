const { ApplicationCommandOptionType, Client, Interaction } = require("discord.js");
const getSelected = require("../../utils/getSelected");
const fetchData = require("../../utils/fetchData");
const createNewData = require("../../utils/createNewData");
const getRole = require("../../utils/getRole");
const isNewRole = require("../../utils/isNewRole");

module.exports = {
    name: 'rankset',
    description: 'set a users rank!',
    options: [
        {
            name: 'target-user',
            description: 'The user whose rank you would like to set',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'rank',
            description: 'the rank you would like to give the user.',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @param {GuildMember} userObj
     * @returns 
     */
    devOnly: true,

    callback: async (client, interaction) => {

        await interaction.deferReply();

        const userId = interaction.options.get('target-user').value;
        const newRank = interaction.options.get('rank').value;

        const userObj = await interaction.guild.members.cache.find(member => member.id === userId);
        const type = getSelected(userObj);
        if (!type) return interaction.editReply("This users has not selected an adventure");
        const data = await fetchData(type, userObj.id, interaction.guild.id)
        if (!data) data = await createNewData(type, userObj.id, interaction.guild.id)
        if (isNewRole(newRank)) {
            let role = await getRole(newRank, type, interaction.guild, false)
            console.log(role)
            userObj.roles.add(role)
            data.role = role;
        }
        data.rank = newRank
        data.save()
        interaction.editReply({
            content: "Updated " + userObj.displayName + " Rank.",
            ephemeral: true
        });
        return
    }
}