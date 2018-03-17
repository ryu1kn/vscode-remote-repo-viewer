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
    description: 'Default',
    prefix: '',
    downloadCommand: ({ repository, directoryPath }) =>
      `git clone --depth 1 ${repository} ${directoryPath}`,
    directoryName: ({ repository }) => repository.match(/\/([^.]+)\.git/)[1]
  }
]
