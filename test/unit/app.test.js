const { expect } = require('chai')
const td = require('testdouble')
const App = require('../../lib/app')

suite('App', () => {
  test('it downloads the git repository into a specified directory', async () => {
    const shellCommandRunner = td.object(['run'])
    await createApp({
      shellCommandRunner
    }).fetchRepository()

    td.verify(
      shellCommandRunner.run('git', ['clone', 'REPOSITORY_URL'], {
        cwd: 'SAVE_DIR'
      })
    )
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
    return new App({
      vscode,
      shellCommandRunner
    })
  }
})
