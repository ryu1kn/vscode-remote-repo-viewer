const App = require('./app')

class AppFactory {
  create ({ vscode, shellCommandRunner }) {
    return new App({ vscode, shellCommandRunner })
  }
}

module.exports = AppFactory
