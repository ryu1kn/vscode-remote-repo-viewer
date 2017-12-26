const path = require('path')
const ConfigStore = require('./config-store')
const RepositoryService = require('./repository-service')
const RepositoryDisplayer = require('./repository-displayer')

class App {
  constructor (params) {
    this._repositoryService = new RepositoryService({
      shellCommandRunner: params.shellCommandRunner
    })
    this._repositoryDisplayer = new RepositoryDisplayer({
      vscCommands: params.vscCommands,
      vscUri: params.vscUri
    })
    this._configStore = new ConfigStore({
      vscWorkspace: params.vscWorkspace
    })
    this._vscWindow = params.vscWindow
  }

  async fetchRepository () {
    const url = await this._readRepositoryUrl()
    const repositoryName = this._extractRepositoryName(url)
    const location = this._configStore.repositorySaveDirectoryPath
    const repositoryPath = path.join(location, repositoryName)
    await this._downloadRepository(url, repositoryPath)
    return this._repositoryDisplayer.display(repositoryPath)
  }

  _readRepositoryUrl () {
    return this._vscWindow.showInputBox()
  }

  _extractRepositoryName (url) {
    return url.match(/\/(.*)\.git$/)[1]
  }

  _downloadRepository (url, saveLocation) {
    return this._repositoryService.clone(url, saveLocation)
  }
}

module.exports = App
