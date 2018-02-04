const { expect } = require('chai')
const td = require('testdouble')
const FetchRepositoryCommand = require('../../../lib/commands/fetch-repository')

suite('FetchRepositoryCommand', () => {
  test('it tries to open a local copy of the repository', async () => {
    const displayRepository = td.function()
    const app = createFetchRepositoryCommand({
      displayRepository,
      localRepositoryPath: 'SAVE_DIR/BAZ'
    })

    await app.fetchRepository()

    td.verify(displayRepository('SAVE_DIR/BAZ'))
  })

  test('it downloads the git repository into a specified directory', async () => {
    const runShellCommandRunner = td.function()
    const app = createFetchRepositoryCommand({ runShellCommandRunner })

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
    const app = createFetchRepositoryCommand({ showInputBox })

    await app.fetchRepository()
  })

  test("it does nothing if user didn't enter a git repository URL", async () => {
    const showInputBox = () => {}
    const app = createFetchRepositoryCommand({ showInputBox })

    await app.fetchRepository() // No errors
  })

  test('it throws an exception if downloading encounters a problem', () => {
    const runShellCommandRunner = () => Promise.reject(new Error('UNKNOWN'))
    const app = createFetchRepositoryCommand({ runShellCommandRunner })
    return app.fetchRepository().then(throwsIfCalled, e => {
      expect(e.message).to.eql('UNKNOWN')
    })
  })

  test('it logs an error if the command encounters a problem', async () => {
    const runShellCommandRunner = () => Promise.reject(new Error('UNKNOWN'))
    const errorLogger = td.function()
    const app = createFetchRepositoryCommand({
      runShellCommandRunner,
      errorLogger
    })
    try {
      await app.fetchRepository()
    } catch (_e) {
      td.verify(errorLogger(td.matchers.contains('UNKNOWN')))
    }
  })

  function createFetchRepositoryCommand ({
    runShellCommandRunner = () => Promise.resolve(),
    displayRepository = () => {},
    localRepositoryPath,
    repositorySaveDirectoryPath = 'SAVE_DIR',
    errorLogger = () => {},
    showInputBox = () => Promise.resolve('git@FOO.com:BAR/BAZ.git')
  } = {}) {
    const shellCommandRunner = { run: runShellCommandRunner }
    const vscWindow = { showInputBox }
    const configStore = { repositorySaveDirectoryPath }
    const repositoryDisplayer = { display: displayRepository }
    const fileStats = {
      existsDirectory: path => Promise.resolve(path === localRepositoryPath)
    }
    const logger = { error: errorLogger }
    return new FetchRepositoryCommand({
      configStore,
      repositoryDisplayer,
      shellCommandRunner,
      vscWindow,
      fileStats,
      logger
    })
  }

  function throwsIfCalled () {
    throw new Error('Should have been rejected')
  }
})
