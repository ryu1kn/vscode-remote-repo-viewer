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

const commandFactory = new CommandFactory({
  vscode,
  shellCommandRunner,
  envVarReader,
  fs
})

exports.activate = context => {
  const openRepositoryCommand = commandFactory.createOpenRepositoryCommand()
  const disposable = vscode.commands.registerCommand(
    'remoteRepoViewer.openRepository',
    openRepositoryCommand.execute,
    openRepositoryCommand
  )
  context.subscriptions.push(disposable)

  const openDownloadedRepositoryCommand = commandFactory.createOpenDownloadedRepositoryCommand()
  const disposable2 = vscode.commands.registerCommand(
    'remoteRepoViewer.openDownloadedRepository',
    openDownloadedRepositoryCommand.execute,
    openDownloadedRepositoryCommand
  )
  context.subscriptions.push(disposable2)
}

exports.deactivate = () => {}
