const vscode = require('vscode')
const childProcess = require('child_process')
const App = require('./lib/app')
const ShellCommandRunner = require('./lib/shell-command-runner')

const shellCommandRunner = new ShellCommandRunner({ childProcess })
const app = new App({ vscode, shellCommandRunner })

exports.activate = context => {
  const disposable = vscode.commands.registerCommand(
    'codeReading.openRepository',
    app.fetchRepository,
    app
  )
  context.subscriptions.push(disposable)
}

exports.deactivate = () => {}
