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
  const commandList = [
    {
      name: 'openRepository',
      factoryMethodName: 'createOpenRepositoryCommand'
    },
    {
      name: 'openDownloadedRepository',
      factoryMethodName: 'createOpenDownloadedRepositoryCommand'
    }
  ]
  registerCommands(context, commandList)
}

function registerCommands (context, commandList) {
  commandList.forEach(command => {
    const cmd = commandFactory[command.factoryMethodName]()
    const disposable = vscode.commands.registerCommand(
      `remoteRepoViewer.${command.name}`,
      cmd.execute,
      cmd
    )
    context.subscriptions.push(disposable)
  })
}

exports.deactivate = () => {}
