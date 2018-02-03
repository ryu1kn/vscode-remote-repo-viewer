const { join } = require('path')

class SelectRepositoryCommand {
  constructor (params) {
    this._configStore = params.configStore
    this._repositoryDisplayer = params.repositoryDisplayer
    this._vscWindow = params.vscWindow
    this._fileService = params.directoryLister
  }

  async selectRepository () {
    const repositorySaveDirPath = this._configStore.repositorySaveDirectoryPath
    const repositories = await this._fileService.list(repositorySaveDirPath)
    const repository = await this._vscWindow.showQuickPick(repositories)
    const repositoryPath = join(repositorySaveDirPath, repository)
    return this._repositoryDisplayer.display(repositoryPath)
  }
}

module.exports = SelectRepositoryCommand
