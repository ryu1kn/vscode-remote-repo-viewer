class UriComponent {
  constructor ({ vscode }) {
    this._vscode = vscode
  }

  file (filePath) {
    return this._vscode.Uri.file(filePath)
  }
}

module.exports = UriComponent
