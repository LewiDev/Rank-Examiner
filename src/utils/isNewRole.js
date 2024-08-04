const { roles } = require('../../config.json')

const reqRanks = [5, 10, 25, 50, 75, 100, 200, 400]

module.exports = (newRank) => reqRanks.includes(newRank)
