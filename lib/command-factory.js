const ConfigStore = require('./config-store')
const DirectoryLister = require('./adapters/directory-lister')
const OpenRepositoryCommand = require('./commands/open-repository')
const OpenDownloadedRepositoryCommand = require('./commands/open-downloaded-repository')
const RepositoryDisplayer = require('./repository-displayer')
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

  createOpenRepositoryCommand () {
    return new OpenRepositoryCommand({
      shellCommandRunner: this._shellCommandRunner,
      configStore: this._getConfigStore(),
      vscWindow: this._getVscWindow(),
      fileStats: new FileStats({ fs: this._fs }),
      repositoryDisplayer: this._getRepositoryDisplayer(),
      logger: console
    })
  }

  createOpenDownloadedRepositoryCommand () {
    return new OpenDownloadedRepositoryCommand({
      configStore: this._getConfigStore(),
      repositoryDisplayer: this._getRepositoryDisplayer(),
      vscWindow: this._getVscWindow(),
      directoryLister: new DirectoryLister({ fs: this._fs })
    })
  }

  _getConfigStore () {
    this._configStore = this._configStore || this._createConfigStore()
    return this._configStore
  }

  _createConfigStore () {
    return new ConfigStore({
      envVarReader: this._envVarReader,
      vscWorkspace: new VscWorkspace({ vscode: this._vscode })
    })
  }

  _getRepositoryDisplayer () {
    this._repositoryDisplayer =
      this._repositoryDisplayer || this._createRepositoryDisplayer()
    return this._repositoryDisplayer
  }

  _createRepositoryDisplayer () {
    const vscode = this._vscode
    return new RepositoryDisplayer({
      vscCommands: new VscCommands({ vscode }),
      vscUri: new VscUri({ vscode })
    })
  }

  _getVscWindow () {
    this._vscWindow = this._vscWindow || new VscWindow({ vscode: this._vscode })
    return this._vscWindow
  }
}

module.exports = CommandFactory
