const vscode = require('vscode')
const { expect } = require('chai')

const VscUri = require('../../../lib/vscode/uri')

suite('Uri', () => {
  test('it holds the Uri object of VS Code', () => {
    const uri = createUri('/tmp')
    expect(uri.vscodeUri).to.be.instanceOf(vscode.Uri)
  })

  test('the VS Code Uri object represents specified file path', () => {
    const uri = createUri('/tmp')
    expect(uri.vscodeUri.fsPath).to.eql('/tmp')
  })

  function createUri (path) {
    const vscUri = new VscUri({ vscode })
    return vscUri.file(path)
  }
})
