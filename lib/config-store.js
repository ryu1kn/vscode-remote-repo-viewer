class ConfigStore {
  constructor ({ vscWorkspace }) {
    this._vscWorkspace = vscWorkspace
  }

  get repositorySaveDirectoryPath () {
    return this._vscWorkspace.getConfig('codeReading', 'repositorySaveLocation')
  }
}

module.exports = ConfigStore
