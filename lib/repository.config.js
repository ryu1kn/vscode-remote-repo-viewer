const fetch = require('node-fetch')

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
    description: 'Default',
    prefix: '',
    downloadCommand: ({ repository, directoryPath }) =>
      `git clone --depth 1 ${repository} ${directoryPath}`,
    directoryName: ({ repository }) => {
      const [, user, repo] = repository.match(/:([^/]+)\/([^.]+)\.git/)
      return `git--${user}--${repo}`
    }
  }
]
