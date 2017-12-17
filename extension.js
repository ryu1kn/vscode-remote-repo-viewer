const vscode = require('vscode')

exports.activate = function (context) {
  const disposable = vscode.commands.registerCommand(
    'codeReading.openRepository',
    function () {
      const location = vscode.workspace
        .getConfiguration('codeReading')
        .get('repositorySaveLocation')
      vscode.window.showInformationMessage(`Location: ${location}`)
    }
  )
  context.subscriptions.push(disposable)
}

exports.deactivate = function () {}
