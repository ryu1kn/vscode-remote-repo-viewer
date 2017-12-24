const CommandsComponent = require('./commands-component')
const UriComponent = require('./uri-component')
const WindowComponent = require('./window-component')
const WorkspaceComponent = require('./workspace-component')

class App {
  constructor ({ vscode, shellCommandRunner }) {
    this._shellCommandRunner = shellCommandRunner
    this._windowComponent = new WindowComponent({ vscode })
    this._workspaceComponent = new WorkspaceComponent({ vscode })
    this._commandsComponent = new CommandsComponent({ vscode })
    this._uriComponent = new UriComponent({ vscode })
  }

  async fetchRepository () {
    const url = await this._readRepositoryUrl()
    const repositoryName = this._extractRepositoryName(url)
    const location = this._readRepositorySaveLocation()
    await this._downloadRepository(url, location)
    return this._openRepositoryInNewWindow(location, repositoryName)
  }

  _readRepositoryUrl () {
    return this._windowComponent.showInputBox()
  }

  _extractRepositoryName (url) {
    return url.match(/\/(.*)\.git$/)[1]
  }

  _readRepositorySaveLocation () {
    return this._workspaceComponent.getConfig(
      'codeReading',
      'repositorySaveLocation'
    )
  }

  _downloadRepository (url, saveLocation) {
    return this._shellCommandRunner.run('git', ['clone', url], {
      cwd: saveLocation
    })
  }

  _openRepositoryInNewWindow (saveLocation, repositoryName) {
    return this._commandsComponent.executeCommand(
      'vscode.openFolder',
      this._uriComponent.file(`${saveLocation}/${repositoryName}`).vscodeUri,
      true
    )
  }
}

module.exports = App
