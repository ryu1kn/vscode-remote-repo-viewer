
Feature: Open a repository on VS Code
  As a developer
  I want to use VS Code to read code on a remote repository
  So that I can do effective code reading

  Scenario: Opening a Git repository on VS Code
    Given the repository save location is "{{feature-tmp-directory}}"
    When I execute open repository command and enter "git@github.com:ryu1kn/vscode-remote-repo-viewer.git"
    Then I see "{{feature-tmp-directory}}/git--ryu1kn--vscode-remote-repo-viewer" folder opened in a new window

  Scenario: Opening a GitHub repository on VS Code
    Given the repository save location is "{{feature-tmp-directory}}"
    When I execute open repository command and enter "g ryu1kn/vscode-remote-repo-viewer"
    Then I see "{{feature-tmp-directory}}/github--ryu1kn--vscode-remote-repo-viewer" folder opened in a new window

  Scenario: Opening a npm package on VS Code
    Given the repository save location is "{{feature-tmp-directory}}"
    When I execute open repository command and enter "n csv-writer"
    Then I see "{{feature-tmp-directory}}/npm--csv-writer" folder opened in a new window
