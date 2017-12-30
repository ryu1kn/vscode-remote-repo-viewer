
Feature: Open a GitHub repository on VS Code
  As a developer
  I want to use VS Code to read code on GitHub
  So that I can do effective code reading

  Scenario: Opening a GitHub repository on VS Code
    Given the repository save location is "{{feature-tmp-directory}}"
    When I execute open repository command and enter "git@github.com:ryu1kn/vscode-remote-repo-viewer.git"
    Then I see "{{feature-tmp-directory}}/vscode-remote-repo-viewer" folder opened in a new window
