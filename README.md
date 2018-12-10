[![Build Status](https://travis-ci.org/ryu1kn/vscode-remote-repo-viewer.svg?branch=master)](https://travis-ci.org/ryu1kn/vscode-remote-repo-viewer)

# Remote Repository Viewer

Found an interesting repository and want to check it in detail?
Use VS Code for the effective code reading.

This extension fetches the repository into a user defined directory and open it in a new editor window.

## Features

* Clone the repository you want to read and open it in a new window
* Do not clone and just open in a new window if the repository is previously cloned
* Show the list of already cloned repositories so that user can quickly open them
* GitHub repository can be opened with `g` prefix. e.g. `g Microsoft/vscode`
* npm package code can be opened with `n` prefix. e.g. `n lodash`
* VS Code extension code can be opened with `vsc` prefix. e.g. `vsc https://marketplace.visualstudio.com/items?itemName=ryu1kn.remote-repo-viewer`

![Download and open repository in new window](https://raw.githubusercontent.com/ryu1kn/vscode-remote-repo-viewer/master/images/public.gif)

## Request Features or Report Bugs

Feature requests and bug reports are very welcome: https://github.com/ryu1kn/vscode-remote-repo-viewer/issues

A couple of requests from me when you raise an github issue.

* **Requesting a feature:** Please try to provide the context of why you want the feature. Such as, in what situation the feature could help you and how, or how the lack of the feature is causing an inconvenience to you. I can't think of introducing it until I understand how it helps you 🙂
* **Reporting a bug:** Please include environment information (OS name/version, the editor version). Also consider providing screenshots (or even videos) where appropriate. They are often very very helpful!

## Requirements

* `Git` command needs to be available.

## Commands

* `Open repository in a new window`
* `Open one of already downloaded repositories in a new window`

## Extension Settings

This extension contributes the following settings:

* `remoteRepoViewer.repositoryStoreDirectoryPath`

    Path of the directory where repositories are saved. Environment variable `ENV_NAME` can be used as `{{env.ENV_NAME}}`.
    e.g. `{{env.HOME}}/remote-repo-viewer`

## Changelog

* https://github.com/ryu1kn/vscode-remote-repo-viewer/blob/master/CHANGELOG.md
