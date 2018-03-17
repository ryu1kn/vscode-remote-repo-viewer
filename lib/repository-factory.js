const Repository = require('./repository')
const repositoryConfig = require('./repository.config')

class RepositoryFactory {
  constructor (params) {
    this._configStore = params.configStore
    this._shellCommandRunner = params.shellCommandRunner
    this._fileStats = params.fileStats
  }

  create (repoSpec) {
    const repoRule = repositoryConfig.find(({ prefix }) =>
      repoSpec.startsWith(prefix)
    )
    return new Repository({
      repoRule,
      repositorySaveDirPath: this._configStore.repositorySaveDirectoryPath,
      shellCommandRunner: this._shellCommandRunner,
      fileStats: this._fileStats,
      repoSpec
    })
  }
}

module.exports = RepositoryFactory
