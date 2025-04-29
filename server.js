const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500

//logger to come before everything else
app.use(logger)

// applying cors, crucial !!
app.use(cors(corsOptions))


//for the ability to process json
app.use(express.json())

// 3rd party middleware, to parse cookies
app.use(cookieParser())

//listen for the root route
// telling express where to find static files like css or images
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

// errors 404
// new regex syntax
app.all(/.*/, (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

// use errorHandler at the very end, before port
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))