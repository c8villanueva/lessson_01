const { format } = require('date-fns')
const { v4: uuid } = require('uuid') //getting v4 and renaming it to uuid
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss') // refer to documentation for further formatting
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
  } catch (err) {
    console.log(err)
  }
}

//middleware has req, res, and next
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log') // you could add more specifications instead of letting it log every single req, that would get full very fast
  console.log(`${req.method} ${req.path}`)
  next()
}

module.exports = { logEvents, logger }