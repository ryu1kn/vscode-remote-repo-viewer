const path = require('path')

class Repository {
  constructor (params) {
    this._repoRule = params.repoRule
    this._repoSpec = params.repoSpec
    this._repositorySaveDirPath = params.repositorySaveDirPath
    this._shellCommandRunner = params.shellCommandRunner
    this._fileStats = params.fileStats
  }

  async downloadIfNotExist () {
    const repoRule = this._repoRule
    const repoSpecWithoutPrefix = this._repoSpec.replace(repoRule.prefix, '')
    const repositoryName = repoRule.directoryName({
      repository: repoSpecWithoutPrefix
    })
    const params = {
      repository: repoSpecWithoutPrefix,
      directoryPath: path.join(this._repositorySaveDirPath, repositoryName)
    }
    const command = repoRule.downloadCommand(params)
    if (!await this._fileStats.existsDirectory(params.directoryPath)) {
      await this._shellCommandRunner.run(command)
    }
    return params.directoryPath
  }
}

module.exports = Repository
