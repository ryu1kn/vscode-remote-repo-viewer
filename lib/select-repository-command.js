class SelectRepositoryCommand {
  constructor (params) {
    this._configStore = params.configStore
    this._vscWindow = params.vscWindow
    this._fileService = params.directoryLister
  }

  async selectRepository () {
    const repositorySaveDirPath = this._configStore.repositorySaveDirectoryPath
    const repositories = await this._fileService.list(repositorySaveDirPath)
    return this._vscWindow.showQuickPick(repositories)
  }
}

module.exports = SelectRepositoryCommand
