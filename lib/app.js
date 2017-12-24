const VscCommands = require('./vscode/commands')
const VscUri = require('./vscode/uri')
const VscWindow = require('./vscode/window')
const VscWorkspace = require('./vscode/workspace')

class App {
  constructor ({ vscode, shellCommandRunner }) {
    this._shellCommandRunner = shellCommandRunner
    this._vscCommands = new VscCommands({ vscode })
    this._vscUri = new VscUri({ vscode })
    this._vscWindow = new VscWindow({ vscode })
    this._vscWorkspace = new VscWorkspace({ vscode })
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
