const git = require('git-rev')
const { send } = require('micro')
const { name } = require('./package.json')
const {
  NODE_ENV,
  NOW = false,
  NOW_ALIAS = "",
  NOW_URL = "",
  TRAVIS_BRANCH = "",
  TRAVIS_PULL_REQUEST = null,
} = process.env

const getBranch = () => new Promise((resolve) => git.branch(value => resolve(value)))
const getSha = () => new Promise((resolve) => git.short(value => resolve(value)))

module.exports = async (req, res) => {
  const [branch, sha] = await Promise.all([ getBranch(), getSha() ])
  send(res, 200, { 
    attempt: 4,
    name, 
    branch, 
    sha,
    NODE_ENV,
    NOW,
    NOW_ALIAS,
    NOW_URL,
    TRAVIS_BRANCH,
    TRAVIS_PULL_REQUEST,
  })
}
