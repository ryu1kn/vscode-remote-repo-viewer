const path = require('path')
const RepositoryService = require('../repository-service')
const RepositoryNameMaker = require('../repository-name-maker')

class FetchRepositoryCommand {
  constructor (params) {
    this._configStore = params.configStore
    this._repositoryService = new RepositoryService({
      shellCommandRunner: params.shellCommandRunner
    })
    this._repositoryDisplayer = params.repositoryDisplayer
    this._repositoryNameMaker = new RepositoryNameMaker()
    this._vscWindow = params.vscWindow
    this._fileStats = params.fileStats
    this._logger = params.logger
  }

  async fetchRepository () {
    try {
      const url = await this._readRepositoryUrl()
      if (!url) return

      const repositoryName = this._repositoryNameMaker.make(url)
      const repositorySaveDirPath = this._configStore
        .repositorySaveDirectoryPath
      const repositoryPath = path.join(repositorySaveDirPath, repositoryName)
      if (!await this._fileStats.existsDirectory(repositoryPath)) {
        await this._repositoryService.clone(url, repositoryPath)
      }
      return this._repositoryDisplayer.display(repositoryPath)
    } catch (e) {
      this._logger.error(e.stack)
      throw e
    }
  }

  _readRepositoryUrl () {
    return this._vscWindow.showInputBox('Git Repository URL')
  }
}

module.exports = FetchRepositoryCommand
