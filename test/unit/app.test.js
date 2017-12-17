const { expect } = require('chai')
const App = require('../../lib/app')

suite('App', () => {
  test('it lets user specify a repository url', async () => {
    const vscode = {
      window: {
        showInputBox: () => Promise.resolve('REPOSITORY_URL')
      }
    }

    const app = new App({ vscode })
    const repositoryUrl = await app.fetchRepository()

    expect(repositoryUrl).to.eql('REPOSITORY_URL')
  })
})
