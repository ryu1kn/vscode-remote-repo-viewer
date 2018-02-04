const td = require('testdouble')
const OpenDownloadedRepositoryCommand = require('../../../lib/commands/open-downloaded-repository')

suite('OpenDownloadedRepository', () => {
  test('it lets user to open a repository already downloaded', async () => {
    const vscWindow = { showQuickPick: ([repo1]) => repo1 }
    const repositoryDisplayer = td.object(['display'])
    const command = createOpenDownloadedRepositoryCommand({
      repositoryDisplayer,
      vscWindow
    })

    await command.execute()

    td.verify(repositoryDisplayer.display('SAVE_DIR/BAZ/REPO_A'))
  })

  test('it does nothing if user does not select any repository', async () => {
    const repositoryDisplayer = td.object(['display'])
    const vscWindow = { showQuickPick: () => {} }
    const command = createOpenDownloadedRepositoryCommand({
      repositoryDisplayer,
      vscWindow
    })

    await command.execute()

    td.verify(repositoryDisplayer.display(), {
      times: 0,
      ignoreExtraArgs: true
    })
  })

  function createOpenDownloadedRepositoryCommand ({
    repositoryDisplayer,
    vscWindow
  }) {
    const configStore = { repositorySaveDirectoryPath: 'SAVE_DIR/BAZ' }
    const directoryLister = {
      list: dirPath => dirPath === 'SAVE_DIR/BAZ' && ['REPO_A', 'REPO_B']
    }
    return new OpenDownloadedRepositoryCommand({
      configStore,
      directoryLister,
      repositoryDisplayer,
      vscWindow
    })
  }
})
