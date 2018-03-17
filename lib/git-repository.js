const path = require('path')
const RepositoryService = require('./repository-service')
const RepositoryNameMaker = require('./repository-name-maker')

class GitRepository {
  constructor (params) {
    this._repoSpec = params.repoSpec
    this._repositorySaveDirPath = params.repositorySaveDirPath
    this._repositoryService = new RepositoryService({
      shellCommandRunner: params.shellCommandRunner
    })
    this._repositoryNameMaker = new RepositoryNameMaker()
    this._fileStats = params.fileStats
  }

  async downloadIfNotExist () {
    const repoSpec = this._repoSpec
    const url = repoSpec.startsWith('g ')
      ? `git@github.com:${repoSpec.substr(2)}.git`
      : repoSpec
    const repositoryName = this._repositoryNameMaker.make(url)
    const repositoryPath = path.join(
      this._repositorySaveDirPath,
      repositoryName
    )
    if (!await this._fileStats.existsDirectory(repositoryPath)) {
      await this._repositoryService.clone(url, repositoryPath)
    }
    return repositoryPath
  }
}

module.exports = GitRepository
