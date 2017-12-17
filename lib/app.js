class App {
  constructor ({ vscode, shellCommandRunner }) {
    this._vscode = vscode
    this._shellCommandRunner = shellCommandRunner
  }

  async fetchRepository () {
    const url = await this._vscode.window.showInputBox()
    const location = this._vscode.workspace
      .getConfiguration('codeReading')
      .get('repositorySaveLocation')
    return this._shellCommandRunner.run('git', ['clone', url], {
      cwd: location
    })
  }
}

module.exports = App
