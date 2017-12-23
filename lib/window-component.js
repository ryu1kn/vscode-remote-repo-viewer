class WindowComponent {
  constructor ({ vscode }) {
    this._vscode = vscode
  }

  showInputBox () {
    return this._vscode.window.showInputBox()
  }
}

module.exports = WindowComponent
