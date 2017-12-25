const App = require('./app')
const VscCommands = require('./vscode/commands')
const VscUri = require('./vscode/uri')
const VscWindow = require('./vscode/window')
const VscWorkspace = require('./vscode/workspace')

class AppFactory {
  create ({ vscode, shellCommandRunner }) {
    return new App({
      shellCommandRunner,
      vscCommands: new VscCommands({ vscode }),
      vscUri: new VscUri({ vscode }),
      vscWindow: new VscWindow({ vscode }),
      vscWorkspace: new VscWorkspace({ vscode })
    })
  }
}

module.exports = AppFactory
