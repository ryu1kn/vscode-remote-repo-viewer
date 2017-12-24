const WindowComponent = require('./window-component')
const WorkspaceComponent = require('./workspace-component')

class App {
  constructor ({ vscode, shellCommandRunner }) {
    this._vscode = vscode
    this._shellCommandRunner = shellCommandRunner
    this._windowComponent = new WindowComponent({ vscode })
    this._workspaceComponent = new WorkspaceComponent({ vscode })
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
    return this._vscode.commands.executeCommand(
      'vscode.openFolder',
      this._vscode.Uri.file(`${saveLocation}/${repositoryName}`),
      true
    )
  }
}

module.exports = App
