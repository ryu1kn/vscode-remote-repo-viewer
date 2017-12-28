class EnvVarReader {
  constructor ({ env }) {
    this._envVars = env
  }

  read (name) {
    return this._envVars[name]
  }
}

module.exports = EnvVarReader
