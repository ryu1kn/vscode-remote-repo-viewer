const vscode = require('vscode')
const childProcess = require('child_process')
const fs = require('fs')

const CommandFactory = require('./lib/command-factory')
const EnvVarReader = require('./lib/env-var-reader')
const ShellCommandRunner = require('./lib/shell-command-runner')

const envVarReader = new EnvVarReader({ env: process.env })
const shellCommandRunner = new ShellCommandRunner({
  childProcess,
  envVarReader
})
const app = new CommandFactory().create({
  vscode,
  shellCommandRunner,
  envVarReader,
  fs
})

exports.activate = context => {
  const disposable = vscode.commands.registerCommand(
    'remoteRepoViewer.openRepository',
    app.fetchRepository,
    app
  )
  context.subscriptions.push(disposable)
}

exports.deactivate = () => {}
