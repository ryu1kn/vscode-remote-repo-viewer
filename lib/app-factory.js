const App = require('./app')
const VscCommands = require('./vscode/commands')
const VscUri = require('./vscode/uri')
const VscWindow = require('./vscode/window')
const VscWorkspace = require('./vscode/workspace')
const EnvVarReader = require('./env-var-reader')
const FileStats = require('./file-stats')

class AppFactory {
  create ({ vscode, shellCommandRunner, fs }) {
    return new App({
      shellCommandRunner,
      vscCommands: new VscCommands({ vscode }),
      vscUri: new VscUri({ vscode }),
      vscWindow: new VscWindow({ vscode }),
      vscWorkspace: new VscWorkspace({ vscode }),
      envVarReader: new EnvVarReader({ env: process.env }),
      fileStats: new FileStats({ fs })
    })
  }
}

module.exports = AppFactory
