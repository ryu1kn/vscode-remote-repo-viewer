const { expect } = require('chai')
const td = require('testdouble')
const OpenRepositoryCommand = require('../../../lib/commands/open-repository')

suite('OpenRepositoryCommand', () => {
  test('it tries to open a local copy of the repository', async () => {
    const displayRepository = td.function()
    const command = createOpenRepositoryCommand({
      displayRepository,
      localRepositoryPath: 'SAVE_DIR/BAZ'
    })

    await command.execute()

    td.verify(displayRepository('SAVE_DIR/BAZ'))
  })

  test('it downloads the git repository into a specified directory', async () => {
    const runShellCommandRunner = td.function()
    const command = createOpenRepositoryCommand({ runShellCommandRunner })

    await command.execute()

    td.verify(
      runShellCommandRunner('bash', [
        '-c',
        'git clone --depth 1 git@FOO.com:BAR/BAZ.git SAVE_DIR/BAZ'
      ])
    )
  })

  test('it downloads a repository from GitHub if user used "g" prefix', async () => {
    const showInputBox = td.function()
    td.when(showInputBox('Git Repository URL')).thenResolve('g BAR/BAZ')
    const runShellCommandRunner = td.function()
    const command = createOpenRepositoryCommand({
      showInputBox,
      runShellCommandRunner
    })

    await command.execute()

    td.verify(
      runShellCommandRunner('bash', [
        '-c',
        'git clone --depth 1 git@github.com:BAR/BAZ.git SAVE_DIR/BAZ'
      ])
    )
  })

  test('it tells user to specify the repository url they want to open', async () => {
    const showInputBox = td.function()
    td
      .when(showInputBox('Git Repository URL'))
      .thenResolve('git@FOO.com:BAR/BAZ.git')
    const command = createOpenRepositoryCommand({ showInputBox })

    await command.execute()
  })

  test("it does nothing if user didn't enter a git repository URL", async () => {
    const showInputBox = () => {}
    const command = createOpenRepositoryCommand({ showInputBox })

    await command.execute() // No errors
  })

  test('it throws an exception if downloading encounters a problem', () => {
    const runShellCommandRunner = () => Promise.reject(new Error('UNKNOWN'))
    const command = createOpenRepositoryCommand({ runShellCommandRunner })
    return command.execute().then(throwsIfCalled, e => {
      expect(e.message).to.eql('UNKNOWN')
    })
  })

  test('it logs an error if the command encounters a problem', async () => {
    const runShellCommandRunner = () => Promise.reject(new Error('UNKNOWN'))
    const errorLogger = td.function()
    const command = createOpenRepositoryCommand({
      runShellCommandRunner,
      errorLogger
    })
    try {
      await command.execute()
    } catch (_e) {
      td.verify(errorLogger(td.matchers.contains('UNKNOWN')))
    }
  })

  function createOpenRepositoryCommand ({
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
    return new OpenRepositoryCommand({
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
