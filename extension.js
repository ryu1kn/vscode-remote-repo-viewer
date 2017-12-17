const vscode = require('vscode')
const childProcess = require('child_process')
const App = require('./lib/app')

const app = new App({ vscode, childProcess })

exports.activate = context => {
  const disposable = vscode.commands.registerCommand(
    'codeReading.openRepository',
    app.fetchRepository,
    app
  )
  context.subscriptions.push(disposable)
}

exports.deactivate = () => {}
