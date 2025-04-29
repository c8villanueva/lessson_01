const express = require('express')
const router = express.Router()
const path = require('path')

// get request
// first param is the request on the url, res allows u to say where to go
// regex new syntax, put \ before everything?
router.get(/^\/$|\/index(\.html)?/, (req, res) => {
// router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router