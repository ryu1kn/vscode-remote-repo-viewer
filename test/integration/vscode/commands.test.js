const vscode = require('vscode')
const { expect } = require('chai')
const { join } = require('path')

const VscCommands = require('../../../lib/vscode/commands')

suite('Commands', () => {
  test('it executes an editor command @it', async () => {
    const vscCommands = new VscCommands({ vscode })
    const thisFile = vscode.Uri.file(join(__dirname, 'commands.test.js'))

    await vscCommands.executeCommand('vscode.open', thisFile)

    const fileName = vscode.window.activeTextEditor.document.fileName
    expect(fileName.endsWith('commands.test.js')).to.be.true
  })
})
