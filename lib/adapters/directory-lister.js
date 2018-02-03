const { promisify } = require('util')

class DirectoryLister {
  constructor ({ fs }) {
    this._readdir = promisify(fs.readdir)
  }

  list (directoryPath) {
    return this._readdir(directoryPath)
  }
}

module.exports = DirectoryLister
