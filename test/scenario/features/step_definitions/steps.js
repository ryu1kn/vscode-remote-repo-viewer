const { defineSupportCode } = require('cucumber')
const childProcess = require('child_process')
const td = require('testdouble')

const AppFactory = require('../../../../lib/app-factory')
const ShellCommandRunner = require('../../../../lib/shell-command-runner')

const appFactory = new AppFactory()
const shellCommandRunner = new ShellCommandRunner({ childProcess })

defineSupportCode(({ defineStep }) => {
  let repositorySaveDirectory
  let fakeExecuteCommand

  defineStep('the repository save location is {string}', saveDirectory => {
    repositorySaveDirectory = saveDirectory
  })

  defineStep(
    'I execute open repository command and enter {string}',
    async gitUrl => {
      fakeExecuteCommand = td.function()
      const vscode = fakeVscode({
        repositorySaveDirectory,
        repositoryUrl: gitUrl,
        executeCommand: fakeExecuteCommand
      })
      const app = appFactory.create({ shellCommandRunner, vscode })

      await app.fetchRepository()
    }
  )

  defineStep('I see {string} folder opened in a new window', folderName => {
    td.verify(
      fakeExecuteCommand('vscode.openFolder', `URI(${folderName})`, true)
    )
  })

  function fakeVscode ({
    repositorySaveDirectory,
    repositoryUrl,
    executeCommand
  } = {}) {
    const extensionConfig = {
      get: configName =>
        configName === 'repositorySaveLocation' && repositorySaveDirectory
    }
    return {
      window: {
        showInputBox: () => Promise.resolve(repositoryUrl)
      },
      workspace: {
        getConfiguration: extensionName =>
          extensionName === 'codeReading' && extensionConfig
      },
      Uri: { file: filePath => `URI(${filePath})` },
      commands: {
        executeCommand: executeCommand || (() => Promise.resolve())
      }
    }
  }
})
