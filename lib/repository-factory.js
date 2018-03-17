const Repository = require('./git-repository')

class RepositoryFactory {
  constructor (params) {
    this._configStore = params.configStore
    this._shellCommandRunner = params.shellCommandRunner
    this._fileStats = params.fileStats
  }

  create (repoSpec) {
    return new Repository({
      repositorySaveDirPath: this._configStore.repositorySaveDirectoryPath,
      shellCommandRunner: this._shellCommandRunner,
      fileStats: this._fileStats,
      repoSpec
    })
  }
}

module.exports = RepositoryFactory
