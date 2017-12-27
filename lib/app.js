const path = require('path')
const ConfigStore = require('./config-store')
const RepositoryService = require('./repository-service')
const RepositoryDisplayer = require('./repository-displayer')
const RepositoryNameMaker = require('./repository-name-maker')

class App {
  constructor (params) {
    this._repositoryService = new RepositoryService({
      shellCommandRunner: params.shellCommandRunner
    })
    this._repositoryDisplayer = new RepositoryDisplayer({
      vscCommands: params.vscCommands,
      vscUri: params.vscUri
    })
    this._repositoryNameMaker = new RepositoryNameMaker()
    this._configStore = new ConfigStore({
      vscWorkspace: params.vscWorkspace
    })
    this._vscWindow = params.vscWindow
    this._fileStats = params.fileStats
  }

  async fetchRepository () {
    const url = await this._readRepositoryUrl()
    const repositoryName = this._repositoryNameMaker.make(url)
    const repositorySaveDirPath = this._configStore.repositorySaveDirectoryPath
    const repositoryPath = path.join(repositorySaveDirPath, repositoryName)
    if (!await this._fileStats.existsDirectory(repositoryPath)) {
      await this._repositoryService.clone(url, repositoryPath)
    }
    return this._repositoryDisplayer.display(repositoryPath)
  }

  _readRepositoryUrl () {
    return this._vscWindow.showInputBox()
  }
}

module.exports = App
