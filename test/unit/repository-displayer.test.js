const td = require('testdouble')
const RepositoryDisplayer = require('../../lib/repository-displayer')

suite('RepositoryDisplayer', () => {
  test('it opens a new VS Code window to open the repository', async () => {
    const vscCommands = td.object(['executeCommand'])
    const vscUri = { file: path => ({ vscodeUri: `URI(${path})` }) }
    const displayer = new RepositoryDisplayer({ vscCommands, vscUri })

    await displayer.display('/PATH/TO/REPOSITORY')

    td.verify(
      vscCommands.executeCommand(
        'vscode.openFolder',
        'URI(/PATH/TO/REPOSITORY)',
        true
      )
    )
  })
})
