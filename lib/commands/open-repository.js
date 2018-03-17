const RepositoryFactory = require('../repository-factory')

class OpenRepositoryCommand {
  constructor (params) {
    this._repositoryDisplayer = params.repositoryDisplayer
    this._vscWindow = params.vscWindow
    this._repositoryFactory = new RepositoryFactory({
      configStore: params.configStore,
      shellCommandRunner: params.shellCommandRunner,
      fileStats: params.fileStats
    })
    this._logger = params.logger
  }

  async execute () {
    try {
      const repoSpec = await this._readRepositoryUrl()
      if (!repoSpec) return

      const repository = this._repositoryFactory.create(repoSpec)
      const repositoryPath = await repository.downloadIfNotExist()
      return this._repositoryDisplayer.display(repositoryPath)
    } catch (e) {
      this._logger.error(e.stack)
      throw e
    }
  }

  _readRepositoryUrl () {
    return this._vscWindow.showInputBox('Git Repository URL')
  }
}

module.exports = OpenRepositoryCommand
