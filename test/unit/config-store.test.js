const { expect } = require('chai')
const td = require('testdouble')
const ConfigStore = require('../../lib/config-store')

suite('ConfigStore', () => {
  test('it expands environment variables in a path', async () => {
    const envVarReader = {
      read: envVarName => envVarName === 'HOME' && '/PATH/TO/HOME'
    }
    const vscWorkspace = td.object(['getConfig'])
    td
      .when(
        vscWorkspace.getConfig(
          'remoteRepoViewer',
          'repositoryStoreDirectoryPath'
        )
      )
      .thenReturn('{{env.HOME}}/remote-repo-viewer')
    const configStore = new ConfigStore({ envVarReader, vscWorkspace })

    expect(configStore.repositorySaveDirectoryPath).to.eql(
      '/PATH/TO/HOME/remote-repo-viewer'
    )
  })
})
