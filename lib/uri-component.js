class UriComponent {
  constructor ({ vscode }) {
    this._vscode = vscode
  }

  file (filePath) {
    const vscodeUri = this._vscode.Uri.file(filePath)
    return new Uri(vscodeUri) // Experiment. Do not let 3rd-party object travel around
  }
}

class Uri {
  constructor (uri) {
    this._uri = uri
  }

  get vscodeUri () {
    return this._uri
  }
}

UriComponent.Uri = Uri

module.exports = UriComponent
