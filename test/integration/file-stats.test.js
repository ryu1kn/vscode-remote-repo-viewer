const { expect } = require('chai')

const fs = require('fs')
const path = require('path')
const FileStats = require('../../lib/file-stats')

suite('FileStats', () => {
  test('it tells if a directory exists @it', async () => {
    const fileStats = new FileStats({ fs })
    const directoryPath = __dirname
    const existsDirectory = await fileStats.existsDirectory(directoryPath)
    expect(existsDirectory).to.be.true
  })

  test('it tells if a directory does not exist @it', async () => {
    const fileStats = new FileStats({ fs })
    const directoryPath = path.join(__dirname, 'NON_EXIST_DIRECTORY')
    const existsDirectory = await fileStats.existsDirectory(directoryPath)
    expect(existsDirectory).to.be.false
  })
})
