const td = require('testdouble')
const SelectRepositoryCommand = require('../../lib/select-repository-command')

suite('SelectRepositoryCommand', () => {
  test('it lists the repositories already downloaded', async () => {
    const configStore = { repositorySaveDirectoryPath: 'SAVE_DIR/BAZ' }
    const directoryLister = { list: td.function() }
    td
      .when(directoryLister.list('SAVE_DIR/BAZ'))
      .thenReturn(Promise.resolve(['REPO_A', 'REPO_B']))
    const vscWindow = { showQuickPick: td.function() }

    const command = new SelectRepositoryCommand({
      configStore,
      directoryLister,
      vscWindow
    })

    await command.selectRepository()

    td.verify(vscWindow.showQuickPick(['REPO_A', 'REPO_B']))
  })
})
