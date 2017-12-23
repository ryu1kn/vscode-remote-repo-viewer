class App {
  constructor ({ vscode, shellCommandRunner }) {
    this._vscode = vscode
    this._shellCommandRunner = shellCommandRunner
  }

  async fetchRepository () {
    const url = await this._vscode.window.showInputBox()
    const [, repositoryName] = url.match(/\/(.*)\.git$/)
    const location = this._vscode.workspace
      .getConfiguration('codeReading')
      .get('repositorySaveLocation')
    await this._shellCommandRunner.run('git', ['clone', url], {
      cwd: location
    })
    return this._vscode.commands.executeCommand(
      'vscode.openFolder',
      this._vscode.Uri.file(`${location}/${repositoryName}`),
      true
    )
  }
}

module.exports = App
