class VscWindow {
  constructor ({ vscode }) {
    this._vscode = vscode
  }

  showInputBox (placeHolder) {
    return this._vscode.window.showInputBox({ placeHolder })
  }
}

module.exports = VscWindow
