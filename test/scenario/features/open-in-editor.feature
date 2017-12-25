
Feature: Open a GitHub repository on VS Code
  As a developer
  I want to use VS Code to read code on GitHub
  So that I can do effective code reading

  Scenario: Opening a GitHub repository on VS Code
    Given the repository save location is "/tmp"
    When I execute open repository command and enter "git@github.com:ryu1kn/vscode-code-reading.git"
    Then I see "/tmp/vscode-code-reading" folder opened in a new window
