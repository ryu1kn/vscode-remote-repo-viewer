const vscode = require('vscode')

exports.activate = function (context) {
  const disposable = vscode.commands.registerCommand(
    'extension.sayHello',
    function () {
      vscode.window.showInformationMessage('Hello World!')
    }
  )
  context.subscriptions.push(disposable)
}

exports.deactivate = function () {}
