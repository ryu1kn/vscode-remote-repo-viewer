const td = require('testdouble')
const App = require('../../lib/app')

suite('App', () => {
  test('it downloads the git repository into a specified directory', async () => {
    const childProcess = td.object(['spawn'])
    await createApp({ childProcess }).fetchRepository()

    td.verify(
      childProcess.spawn('git', ['clone', 'REPOSITORY_URL'], {
        cwd: 'SAVE_DIR'
      })
    )
  })

  function createApp ({ childProcess } = {}) {
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
    return new App({ vscode, childProcess })
  }
})
