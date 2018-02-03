const FetchRepositoryCommand = require('./commands/fetch-repository')
const VscCommands = require('./vscode/commands')
const VscUri = require('./vscode/uri')
const VscWindow = require('./vscode/window')
const VscWorkspace = require('./vscode/workspace')
const FileStats = require('./file-stats')

class CommandFactory {
  constructor (params) {
    this._vscode = params.vscode
    this._shellCommandRunner = params.shellCommandRunner
    this._envVarReader = params.envVarReader
    this._fs = params.fs
  }

  createFetchRepositoryCommand () {
    return new FetchRepositoryCommand({
      envVarReader: this._envVarReader,
      shellCommandRunner: this._shellCommandRunner,
      vscCommands: new VscCommands({ vscode: this._vscode }),
      vscUri: new VscUri({ vscode: this._vscode }),
      vscWindow: new VscWindow({ vscode: this._vscode }),
      vscWorkspace: new VscWorkspace({ vscode: this._vscode }),
      fileStats: new FileStats({ fs: this._fs }),
      logger: console
    })
  }
}

module.exports = CommandFactory
