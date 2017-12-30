class ConfigStore {
  constructor ({ envVarReader, vscWorkspace }) {
    this._envVarReader = envVarReader
    this._vscWorkspace = vscWorkspace
  }

  get repositorySaveDirectoryPath () {
    const saveDirectoryPath = this._readRepositorySaveLocation()
    return this._expandEnvVars(saveDirectoryPath)
  }

  _readRepositorySaveLocation () {
    return this._vscWorkspace.getConfig(
      'remoteRepoViewer',
      'repositoryStoreDirectoryPath'
    )
  }

  // Hope VS Code supports environment variable resolution,
  // then this custom code can go away. cf. https://github.com/Microsoft/vscode/issues/2809
  _expandEnvVars (path) {
    return path.replace(/{{env.([^}]+)}}/g, (match, capture) =>
      this._envVarReader.read(capture)
    )
  }
}

module.exports = ConfigStore
