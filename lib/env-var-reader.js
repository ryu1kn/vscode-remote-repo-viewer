class EnvVarReader {
  constructor ({ env }) {
    this._envVars = env
  }

  read (name) {
    return this._envVars[name]
  }

  readAll () {
    return this._envVars
  }
}

module.exports = EnvVarReader
