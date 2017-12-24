class VscCommands {
  constructor ({ vscode }) {
    this._vscode = vscode
  }

  executeCommand (commandId, ...args) {
    return this._vscode.commands.executeCommand(commandId, ...args)
  }
}

module.exports = VscCommands
