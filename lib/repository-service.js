class RepositoryService {
  constructor ({ shellCommandRunner }) {
    this._shellCommandRunner = shellCommandRunner
  }

  async clone (url, saveLocation) {
    return this._shellCommandRunner.run('git', [
      'clone',
      '--depth',
      '1',
      url,
      saveLocation
    ])
  }
}

module.exports = RepositoryService
