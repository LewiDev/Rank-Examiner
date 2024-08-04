const { roles } = require('../../config.json')

module.exports = (member) => member.roles.cache.has(roles['Living Grimoir']) ? true : false
