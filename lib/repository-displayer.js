class RepositoryDisplayer {
  constructor ({ vscCommands, vscUri }) {
    this._vscCommands = vscCommands
    this._vscUri = vscUri
  }

  display (repositoryPath) {
    return this._vscCommands.executeCommand(
      'vscode.openFolder',
      this._vscUri.file(repositoryPath).vscodeUri,
      true
    )
  }
}

module.exports = RepositoryDisplayer
