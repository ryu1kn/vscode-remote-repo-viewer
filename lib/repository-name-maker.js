class RepositoryNameMaker {
  make (repositoryUrl) {
    return repositoryUrl.match(/\/(.*)\.git$/)[1]
  }
}

module.exports = RepositoryNameMaker
