const vscode = require('vscode')
const { expect } = require('chai')

const VscWorkspace = require('../../../lib/vscode/workspace')

suite('Workspace', () => {
  test('it reads configuration value from VS Code @it', () => {
    const vscWorkspace = new VscWorkspace({ vscode })
    const autoSave = vscWorkspace.getConfig('files', 'autoSave')
    expect(autoSave).to.eql('off')
  })
})
