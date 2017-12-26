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
    return this._repositoryService.clone(url, saveLocation)
  }

  _openRepositoryInNewWindow (saveLocation, repositoryName) {
    return this._repositoryDisplayer.display(
      `${saveLocation}/${repositoryName}`
    )
  }
}

module.exports = App
