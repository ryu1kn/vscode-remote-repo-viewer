const { defineSupportCode } = require('cucumber')

defineSupportCode(({ defineStep }) => {
  defineStep('the repository save location is {string}', saveDirectory => {
    console.log(saveDirectory)
  })

  defineStep('I invoke {string} command', commandName => {})

  defineStep('I enter {string}', gitUrl => {})

  defineStep('I see {string} project open in a new window', projectName => {})
})
