
Feature: Open a GitHub repository on VS Code
  As a developer
  I want to use VS Code to read code on GitHub
  So that I can do effective code reading

  Scenario: Opening a GitHub repository on VS Code
    Given the repository save location is "tmp"
    When I invoke "Open repository" command
    And I enter "git@github.com:ryu1kn/vscode-code-reading.git"
    Then I see "vscode-code-reading" project open in a new window
