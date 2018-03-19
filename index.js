const git = require('git-rev')
const { send } = require('micro')
const { name } = require('./package.json')

module.exports = async (req, res) => {
    send(res, 200, {
        name
    })
}
