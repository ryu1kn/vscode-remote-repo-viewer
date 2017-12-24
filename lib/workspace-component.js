class WorkspaceComponent {
  constructor ({ vscode }) {
    this._vscode = vscode
  }

  getConfig (category, key) {
    return this._vscode.workspace.getConfiguration(category).get(key)
  }
}

module.exports = WorkspaceComponent
