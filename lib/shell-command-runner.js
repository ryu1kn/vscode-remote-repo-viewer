class ShellCommandRunner {
  constructor ({ childProcess, envVarReader }) {
    this._childProcess = childProcess
    this._envVarReader = envVarReader
  }

  run (shellCommand, options) {
    const optionOverride = {
      env: this._envVarReader.readAll(),
      shell: true
    }
    const command = this._childProcess.spawn(
      shellCommand,
      Object.assign({}, options, optionOverride)
    )
    return this._collectResult(command)
  }

  _collectResult (command) {
    let stdoutString = ''
    let stderrString = ''

    command.stdout.on('data', data => {
      stdoutString += data.toString()
    })
    command.stderr.on('data', data => {
      stderrString += data.toString()
    })

    return new Promise((resolve, reject) => {
      command.on('error', err => reject(err))
      command.on('close', code => {
        if (code === 0) return resolve(stdoutString)

        const message =
          stderrString.trim() || `Command finished with exit code ${code}`
        reject(new Error(message))
      })
    })
  }
}

module.exports = ShellCommandRunner
