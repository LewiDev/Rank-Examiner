const { ApplicationCommandOptionType, Client, Interaction } = require("discord.js");
const getSelected = require("../../utils/getSelected");
const fetchData = require("../../utils/fetchData");
const createNewData = require("../../utils/createNewData");

module.exports = {
    name: 'xpset',
    description: 'set a users xp!',
    options: [
        {
            name: 'target-user',
            description: 'The user whose xp you would like to set',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'xp',
            description: 'the xp you would like to give the user.',
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
        const newXP = interaction.options.get('xp').value;

        const userObj = await interaction.guild.members.cache.find(member => member.id === userId);
        const type = getSelected(userObj);
        if (!type) return interaction.editReply("This users has not selected an adventure");
        const data = await fetchData(type, userObj.id, interaction.guild.id)
        if (!data) data = await createNewData(type, userObj.id, interaction.guild.id)
        data.xp = newXP
        data.save()
        interaction.editReply({
            content: "Updated" + userObj.displayName + " XP.",
            ephemeral: true
        });
        return
    }
}