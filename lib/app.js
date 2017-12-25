class App {
  constructor (params) {
    this._shellCommandRunner = params.shellCommandRunner
    this._vscCommands = params.vscCommands
    this._vscUri = params.vscUri
    this._vscWindow = params.vscWindow
    this._vscWorkspace = params.vscWorkspace
  }

  async fetchRepository () {
    const url = await this._readRepositoryUrl()
    const repositoryName = this._extractRepositoryName(url)
    const location = this._readRepositorySaveLocation()
    await this._downloadRepository(url, location)
    return this._openRepositoryInNewWindow(location, repositoryName)
  }

  _readRepositoryUrl () {
    return this._vscWindow.showInputBox()
  }

  _extractRepositoryName (url) {
    return url.match(/\/(.*)\.git$/)[1]
  }

  _readRepositorySaveLocation () {
    return this._vscWorkspace.getConfig('codeReading', 'repositorySaveLocation')
  }

  _downloadRepository (url, saveLocation) {
    return this._shellCommandRunner.run('git', ['clone', url], {
      cwd: saveLocation
    })
  }

  _openRepositoryInNewWindow (saveLocation, repositoryName) {
    return this._vscCommands.executeCommand(
      'vscode.openFolder',
      this._vscUri.file(`${saveLocation}/${repositoryName}`).vscodeUri,
      true
    )
  }
}

module.exports = App
