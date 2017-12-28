const { expect } = require('chai')

const childProcess = require('child_process')
const EnvVarReader = require('../../lib/env-var-reader')
const ShellCommandRunner = require('../../lib/shell-command-runner')

suite('ShellCommandRunner', () => {
  test('it runs a given command and collects stdout @it', async () => {
    const shellCommandRunner = createShellCommandRunner()
    const output = await shellCommandRunner.run('echo', ['hello'])
    expect(output).to.eql('hello\n')
  })

  test('it uses shell mode to expand environment variables in the command @it', async () => {
    const shellCommandRunner = createShellCommandRunner()
    const output = await shellCommandRunner.run('echo', ['HOME is: $HOME'])
    expect(output).to.have.string('HOME is: /PATH/TO/HOME')
  })

  test('it raises an exception if command failed @it', () => {
    const shellCommandRunner = createShellCommandRunner()
    return shellCommandRunner.run('ls', ['NON_EXISTING_FILE']).then(
      () => new Error('Should have been failed'),
      e => {
        expect(e.message).to.include(
          'NON_EXISTING_FILE: No such file or directory'
        )
      }
    )
  })

  function createShellCommandRunner () {
    const envVars = { HOME: '/PATH/TO/HOME' }
    const envVarReader = new EnvVarReader({ env: envVars })
    return new ShellCommandRunner({
      childProcess,
      envVarReader
    })
  }
})
