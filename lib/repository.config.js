const fetch = require('node-fetch')
const querystring = require('querystring')
const url = require('url')

module.exports = [
  {
    description: 'GitHub',
    prefix: 'g ',
    downloadCommand: ({ repository, directoryPath }) =>
      `git clone --depth 1 git@github.com:${repository}.git ${directoryPath}`,
    directoryName: ({ repository }) =>
      `github--${repository.replace('/', '--')}`
  },
  {
    description: 'npm',
    prefix: 'n ',
    downloadCommand: async ({ repository, directoryPath }) => {
      const response = await fetch(`https://registry.npmjs.org/${repository}`)
      const jsObject = await response.json()
      const repositoryUrl = jsObject.repository.url
      const clonableUrl = repositoryUrl.replace(/^git\+/, '')
      return `git clone --depth 1 ${clonableUrl} ${directoryPath}`
    },
    directoryName: ({ repository }) => `npm--${repository}`
  },
  {
    description: 'Visual Studio Code Extensions',
    prefix: 'vsc ',
    downloadCommand: async ({ repository, directoryPath }) => {
      const response = await fetch(repository)
      const html = await response.text()
      const repositoryUrl = html.match(
        /\{"key":"Microsoft\.VisualStudio\.Services\.Links\.Source","value":"([^"]+)"\}/
      )[1]
      return `git clone --depth 1 ${repositoryUrl} ${directoryPath}`
    },
    directoryName: ({ repository }) => {
      const qs = url.parse(repository).query
      const itemName = querystring.parse(qs).itemName
      return `vsc--${itemName.replace('.', '--')}`
    }
  },
  {
    description: 'Default',
    prefix: '',
    downloadCommand: ({ repository, directoryPath }) =>
      `git clone --depth 1 ${repository} ${directoryPath}`,
    directoryName: ({ repository }) => {
      const repoLink = repository.includes('http')
        ? new URL(repository).pathname
        : repository
      const [,, user, repo] = repoLink.match(/(:|\/)([^/]+)\/([^.]+)\.git/)
      return `git--${user}--${repo}`
    }
  }
]
