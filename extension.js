const vscode = require('vscode')
const childProcess = require('child_process')

const AppFactory = require('./lib/app-factory')
const ShellCommandRunner = require('./lib/shell-command-runner')

const shellCommandRunner = new ShellCommandRunner({ childProcess })
const app = new AppFactory().create({ vscode, shellCommandRunner })

exports.activate = context => {
  const disposable = vscode.commands.registerCommand(
    'codeReading.openRepository',
    app.fetchRepository,
    app
  )
  context.subscriptions.push(disposable)
}

exports.deactivate = () => {}
