const { expect } = require('chai')

const childProcess = require('child_process')
const ShellCommandRunner = require('../../lib/shell-command-runner')

suite('ShellCommandRunner', () => {
  test('it runs a given command and collects stdout @it', async () => {
    const shellCommandRunner = createShellCommandRunner()
    const output = await shellCommandRunner.run('echo', ['hello'])
    expect(output).to.eql('hello\n')
  })

  test('it makes environment variables available to the command @it', async () => {
    const shellCommandRunner = createShellCommandRunner()
    const output = await shellCommandRunner.run('sh', ['-c', 'echo $KEY'], {
      env: { KEY: 'VALUE' }
    })
    expect(output).to.eql('VALUE\n')
  })

  test('it raises an exception if command failed @it', () => {
    const shellCommandRunner = createShellCommandRunner()
    return shellCommandRunner.run('ls', ['NON_EXISTING_FILE']).then(
      () => new Error('Should have been failed'),
      e => {
        expect(e.message).to.eql(
          'ls: NON_EXISTING_FILE: No such file or directory'
        )
      }
    )
  })

  function createShellCommandRunner () {
    return new ShellCommandRunner({ childProcess })
  }
})
