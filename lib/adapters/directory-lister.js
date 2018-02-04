class DirectoryLister {
  constructor ({ fs }) {
    this._fs = fs
  }

  list (directoryPath) {
    return new Promise((resolve, reject) => {
      this._fs.readdir(directoryPath, (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}

module.exports = DirectoryLister
