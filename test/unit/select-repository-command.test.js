const td = require('testdouble')
const SelectRepositoryCommand = require('../../lib/select-repository-command')

suite('SelectRepositoryCommand', () => {
  test('it lets user to open a repository already downloaded', async () => {
    const configStore = { repositorySaveDirectoryPath: 'SAVE_DIR/BAZ' }
    const directoryLister = {
      list: dirPath => dirPath === 'SAVE_DIR/BAZ' && ['REPO_A', 'REPO_B']
    }
    const vscWindow = { showQuickPick: ([repo1]) => repo1 }
    const repositoryDisplayer = { display: td.function() }
    const command = new SelectRepositoryCommand({
      configStore,
      directoryLister,
      repositoryDisplayer,
      vscWindow
    })

    await command.selectRepository()

    td.verify(repositoryDisplayer.display('SAVE_DIR/BAZ/REPO_A'))
  })
})
