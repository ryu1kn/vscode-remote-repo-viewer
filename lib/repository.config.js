const fetch = require('node-fetch')

module.exports = [
  {
    description: 'GitHub',
    prefix: 'g ',
    downloadCommand: ({ repository, directoryPath }) =>
      `git clone --depth 1 git@github.com:${repository}.git ${directoryPath}`,
    directoryName: ({ repository }) =>
      repository.substring(repository.indexOf('/'))
  },
  {
    description: 'npm',
    prefix: 'n ',
    downloadCommand: async ({ repository, directoryPath }) => {
      const response = await fetch(`https://registry.npmjs.org/${repository}`)
      const jsObject = await response.json()
      const repositoryUrl = jsObject.repository.url
      return `git clone --depth 1 ${repositoryUrl} ${directoryPath}`
    },
    directoryName: ({ repository }) => repository
  },
  {
    description: 'Default',
    prefix: '',
    downloadCommand: ({ repository, directoryPath }) =>
      `git clone --depth 1 ${repository} ${directoryPath}`,
    directoryName: ({ repository }) => repository.match(/\/([^.]+)\.git/)[1]
  }
]
