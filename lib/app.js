class App {
  constructor ({ vscode, childProcess }) {
    this._vscode = vscode
    this._childProcess = childProcess
  }

  async fetchRepository () {
    const url = await this._vscode.window.showInputBox()
    const location = this._vscode.workspace
      .getConfiguration('codeReading')
      .get('repositorySaveLocation')
    return this._childProcess.spawn('git', ['clone', url], { cwd: location })
  }
}

module.exports = App
