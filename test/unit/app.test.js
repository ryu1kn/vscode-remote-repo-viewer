const { expect } = require('chai')
const td = require('testdouble')
const App = require('../../lib/app')

suite('App', () => {
  test('it tries to open a local copy of the repository', async () => {
    const executeCommand = td.function()
    const app = createApp({
      executeCommand,
      localRepositoryPath: 'SAVE_DIR/BAZ'
    })

    await app.fetchRepository()

    td.verify(executeCommand('vscode.openFolder', 'URI(SAVE_DIR/BAZ)', true))
  })

  test('it downloads the git repository into a specified directory', async () => {
    const runShellCommandRunner = td.function()
    const app = createApp({ runShellCommandRunner })

    await app.fetchRepository()

    td.verify(
      runShellCommandRunner('git', [
        'clone',
        '--depth',
        '1',
        'git@FOO.com:BAR/BAZ.git',
        'SAVE_DIR/BAZ'
      ])
    )
  })

  test('it tells user to specify the repository url they want to open', async () => {
    const showInputBox = td.function()
    td
      .when(showInputBox('Git Repository URL'))
      .thenResolve('git@FOO.com:BAR/BAZ.git')
    const app = createApp({ showInputBox })

    await app.fetchRepository()
  })

  test('it expands environment variables in a path', async () => {
    const runShellCommandRunner = td.function()
    const app = createApp({
      runShellCommandRunner,
      repositorySaveDirectoryPath: '{{env.HOME}}/remote-repo-viewer',
      envVars: { HOME: '/PATH/TO/HOME' }
    })

    await app.fetchRepository()

    td.verify(
      runShellCommandRunner(
        td.matchers.anything(),
        td.matchers.contains('/PATH/TO/HOME/remote-repo-viewer/BAZ')
      )
    )
  })

  test('it opens a new VS Code window to open the repository', async () => {
    const executeCommand = td.function()
    const app = createApp({ executeCommand })

    await app.fetchRepository()

    td.verify(executeCommand('vscode.openFolder', 'URI(SAVE_DIR/BAZ)', true))
  })

  test('it throws an exception if downloading encounters a problem', () => {
    const runShellCommandRunner = () => Promise.reject(new Error('UNKNOWN'))
    const app = createApp({ runShellCommandRunner })
    return app.fetchRepository().then(throwsIfCalled, e => {
      expect(e.message).to.eql('UNKNOWN')
    })
  })

  test('it logs an error if the command encounters a problem', async () => {
    const runShellCommandRunner = () => Promise.reject(new Error('UNKNOWN'))
    const errorLogger = td.function()
    const app = createApp({ runShellCommandRunner, errorLogger })
    try {
      await app.fetchRepository()
    } catch (_e) {
      td.verify(errorLogger(td.matchers.contains('UNKNOWN')))
    }
  })

  function createApp ({
    runShellCommandRunner = () => Promise.resolve(),
    executeCommand = () => Promise.resolve(),
    localRepositoryPath,
    repositorySaveDirectoryPath = 'SAVE_DIR',
    envVars = {},
    errorLogger = () => {},
    showInputBox = () => Promise.resolve('git@FOO.com:BAR/BAZ.git')
  } = {}) {
    const shellCommandRunner = { run: runShellCommandRunner }
    const vscWindow = { showInputBox }
    const vscWorkspace = {
      getConfig: (extensionName, configName) =>
        extensionName === 'remoteRepoViewer' &&
        configName === 'repositoryStoreDirectoryPath' &&
        repositorySaveDirectoryPath
    }
    const vscUri = {
      file: filePath => ({
        get vscodeUri () {
          return `URI(${filePath})`
        }
      })
    }
    const vscCommands = { executeCommand }
    const fileStats = {
      existsDirectory: path => Promise.resolve(path === localRepositoryPath)
    }
    const envVarReader = { read: name => envVars[name] }
    const logger = { error: errorLogger }
    return new App({
      shellCommandRunner,
      vscCommands,
      vscUri,
      vscWindow,
      vscWorkspace,
      fileStats,
      envVarReader,
      logger
    })
  }

  function throwsIfCalled () {
    throw new Error('Should have been rejected')
  }
})
