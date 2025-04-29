const allowedOrigins = require('./allowedOrigins')

//third party middleware, so we have to follow their rules
const corsOptions = {
  origin: (origin, callback) => {
    //only those in the array can access
    //but also block testing apps like postman, so include || !origin
    if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 //the default is 204, some devices have a problem with this
}

module.exports = corsOptions