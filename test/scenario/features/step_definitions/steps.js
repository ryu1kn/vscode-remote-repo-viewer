const { defineSupportCode } = require('cucumber')
const childProcess = require('child_process')
const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')
const td = require('testdouble')

const AppFactory = require('../../../../lib/app-factory')
const ShellCommandRunner = require('../../../../lib/shell-command-runner')

const TMP_DIR_PATH = path.resolve(__dirname, './../../__tmp')

const appFactory = new AppFactory()
const shellCommandRunner = new ShellCommandRunner({ childProcess })

defineSupportCode(({ defineStep, BeforeAll }) => {
  let repositorySaveDirectory
  let fakeExecuteCommand

  BeforeAll(() => cleanDirectory(TMP_DIR_PATH))

  defineStep('the repository save location is {string}', saveDirectory => {
    repositorySaveDirectory = preProcessFilePath(saveDirectory)
  })

  defineStep(
    'I execute open repository command and enter {string}',
    { timeout: 20000 },
    async gitUrl => {
      fakeExecuteCommand = td.function()
      const vscode = fakeVscode({
        repositorySaveDirectory,
        repositoryUrl: gitUrl,
        executeCommand: fakeExecuteCommand
      })
      const app = appFactory.create({ shellCommandRunner, vscode, fs })

      await app.fetchRepository()
    }
  )

  defineStep('I see {string} folder opened in a new window', folderName => {
    td.verify(
      fakeExecuteCommand(
        'vscode.openFolder',
        `URI(${preProcessFilePath(folderName)})`,
        true
      )
    )
  })

  function cleanDirectory (directoryPath) {
    return new Promise((resolve, reject) => {
      rimraf(directoryPath, err => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  function preProcessFilePath (filePath) {
    return filePath.replace('{{feature-tmp-directory}}', TMP_DIR_PATH)
  }

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
