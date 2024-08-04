const { ApplicationCommandOptionType } = require('discord.js');
const getCardAttachment = require('../../utils/getCardAttachment');
const getSelected = require('../../utils/getSelected');
const fetchData = require('../../utils/fetchData')

module.exports = {
    name: 'rank',
    description: 'View your or others ranks!',
    options: [
        {
            name: 'target-user',
            description: 'The user whose rank you would like to see',
            type: ApplicationCommandOptionType.Mentionable
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) => {
        if (!interaction.inGuild()) return interaction.reply("You can only run this command inside a server!");

        await interaction.deferReply()

        const mentionedUserId = interaction.options.get('target-user')?.value;
        const targetId = mentionedUserId ? mentionedUserId : interaction.member.id;
        const target = await interaction.guild.members.fetch(targetId);
        const type = getSelected(target)
        const data = await fetchData(type, target.id, interaction.guild.id);

        const card = await getCardAttachment(type, target, data)
        interaction.editReply({ files: [card]})
    },
}