[![Build Status](https://travis-ci.org/ryu1kn/vscode-remote-repo-viewer.svg?branch=master)](https://travis-ci.org/ryu1kn/vscode-remote-repo-viewer)

# Remote Repository Viewer

Found an interesting repository and want to check it in detail?
Use VS Code for the effective code reading.

This extension fetches the repository into a user defined directory and open it in a new editor window.

## Features

* Clone the repository you want to read and open it in a new window
* Do not clone and just open in a new window if the repository is previously cloned

![Download and open repository in new window](https://raw.githubusercontent.com/ryu1kn/vscode-remote-repo-viewer/master/images/public.gif)

## Requirements

* `Git` command needs to be available.

## Extension Settings

This extension contributes the following settings:

* `remoteRepoViewer.repositoryStoreDirectoryPath`

    Path of the directory where repositories are saved. Environment variable `ENV_NAME` can be used as `{{env.ENV_NAME}}`.
    e.g. `{{env.HOME}}/remote-repo-viewer`

## Request Features or Report Bugs

* https://github.com/ryu1kn/vscode-remote-repo-viewer/issues

## Changelog

* https://github.com/ryu1kn/vscode-remote-repo-viewer/blob/master/CHANGELOG.md
