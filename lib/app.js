class App {
  constructor ({ vscode }) {
    this._vscode = vscode
  }

  async fetchRepository () {
    return this._vscode.window.showInputBox()
  }
}

module.exports = App
