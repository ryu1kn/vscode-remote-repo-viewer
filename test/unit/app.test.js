const { expect } = require('chai')
const td = require('testdouble')
const App = require('../../lib/app')

suite('App', () => {
  test('it tries to open a local copy of the repository', async () => {
    const executeCommand = td.function()
    await createApp({
      executeCommand,
      localRepositoryPath: 'SAVE_DIR/BAZ'
    }).fetchRepository()

    td.verify(executeCommand('vscode.openFolder', 'URI(SAVE_DIR/BAZ)', true))
  })

  test('it downloads the git repository into a specified directory', async () => {
    const shellCommandRunner = td.object(['run'])
    await createApp({
      shellCommandRunner
    }).fetchRepository()

    td.verify(
      shellCommandRunner.run('git', [
        'clone',
        '--depth',
        '1',
        'git@FOO.com:BAR/BAZ.git',
        'SAVE_DIR/BAZ'
      ])
    )
  })

  test('it opens a new VS Code window to open the repository', async () => {
    const shellCommandRunner = { run: () => Promise.resolve() }
    const executeCommand = td.function()
    await createApp({
      shellCommandRunner,
      executeCommand
    }).fetchRepository()

    td.verify(executeCommand('vscode.openFolder', 'URI(SAVE_DIR/BAZ)', true))
  })

  test('it throws an exception if downloading encounters problem', () => {
    const shellCommandRunner = {
      run: () => Promise.reject(new Error('UNKNOWN'))
    }
    const app = createApp({
      shellCommandRunner
    })
    return app.fetchRepository().then(
      () => new Error('Should have been rejected'),
      e => {
        expect(e.message).to.eql('UNKNOWN')
      }
    )
  })

  function createApp ({
    shellCommandRunner,
    executeCommand,
    localRepositoryPath
  } = {}) {
    const vscWindow = {
      showInputBox: () => Promise.resolve('git@FOO.com:BAR/BAZ.git')
    }
    const vscWorkspace = {
      getConfig: (extensionName, configName) =>
        extensionName === 'codeReading' &&
        configName === 'repositorySaveLocation' &&
        'SAVE_DIR'
    }
    const vscUri = {
      file: filePath => ({
        get vscodeUri () {
          return `URI(${filePath})`
        }
      })
    }
    const vscCommands = {
      executeCommand: executeCommand || (() => Promise.resolve())
    }
    const fileStats = {
      existsDirectory: path => Promise.resolve(path === localRepositoryPath)
    }
    return new App({
      shellCommandRunner,
      vscCommands,
      vscUri,
      vscWindow,
      vscWorkspace,
      fileStats
    })
  }
})
