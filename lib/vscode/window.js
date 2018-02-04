class VscWindow {
  constructor ({ vscode }) {
    this._vscode = vscode
  }

  showInputBox (placeHolder) {
    return this._vscode.window.showInputBox({ placeHolder })
  }

  showQuickPick (items) {
    return this._vscode.window.showQuickPick(items)
  }
}

module.exports = VscWindow
