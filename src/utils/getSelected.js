const { roles } = require('../../config.json')

module.exports = (member) => {
    console.log("Member data:", member);
    console.log("Expected role key:", roles["Active Class: Knight"]);
    console.log("Member roles available:", member?.roles.cache.map(r => r.name));

    if (!member || !member.roles || !member.roles.cache.has(roles["Active Class: Knight"])) {
        console.log("Failed to find role on member.");
        return 'mage'; // Default or handle as needed
    }
    return member.roles.cache.has(roles["Active Class: Knight"]) ? 'knight' : 'mage';
}
