const { Client, Message } = require('discord.js');
const handleXP = require('../../utils/handleXP');
const cooldowns = new Set();

module.exports = async (client, message) => {
    if (!message.inGuild() || message.author.bot || cooldowns.has(message.author.id)) return;

    try {
        await handleXP(client, message); // Add await here
        cooldowns.add(message.author.id);
        setTimeout(() => {
            cooldowns.delete(message.author.id);
        }, 15000);
    } catch (error) {
        console.log("Error giving xp: ", error);
    }
}
