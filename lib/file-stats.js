class FileStats {
  constructor ({ fs }) {
    this._fs = fs
  }

  async existsDirectory (path) {
    try {
      const stats = await this._executeStat(path)
      return stats.isDirectory()
    } catch (_e) {
      return false
    }
  }

  _executeStat (path) {
    return new Promise((resolve, reject) => {
      this._fs.stat(path, (err, stats) => {
        if (err) reject(err)
        else resolve(stats)
      })
    })
  }
}

module.exports = FileStats
