const td = require('testdouble')
const App = require('../../lib/app')

suite('App', () => {
  test('it downloads the git repository into a specified directory', async () => {
    const shellCommandRunner = td.object(['run'])
    await createApp({ shellCommandRunner }).fetchRepository()

    td.verify(
      shellCommandRunner.run('git', ['clone', 'REPOSITORY_URL'], {
        cwd: 'SAVE_DIR'
      })
    )
  })

  function createApp ({ shellCommandRunner } = {}) {
    const extensionConfig = {
      get: configName => configName === 'repositorySaveLocation' && 'SAVE_DIR'
    }
    const vscode = {
      window: {
        showInputBox: () => Promise.resolve('REPOSITORY_URL')
      },
      workspace: {
        getConfiguration: extensionName =>
          extensionName === 'codeReading' && extensionConfig
      }
    }
    return new App({ vscode, shellCommandRunner })
  }
})
