class RepositoryService {
  constructor ({ shellCommandRunner }) {
    this._shellCommandRunner = shellCommandRunner
  }

  async clone (url, saveLocation) {
    return this._shellCommandRunner.run('git', ['clone', url], {
      cwd: saveLocation
    })
  }
}

module.exports = RepositoryService
