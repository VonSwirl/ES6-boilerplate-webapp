// Remote Packages
import express from 'express' // https://www.npmjs.com/package/express
import db from 'mongoose' // https://www.npmjs.com/package/mongoose
import helmet from 'helmet' // https://www.npmjs.com/package/helmet
import bodyParser from 'body-parser'// https://www.npmjs.com/package/body-parser
import cookieSesh from 'cookie-session' // https://www.npmjs.com/package/cookie-session
import compression from 'compression' // https://www.npmjs.com/package/compression
import dotenv from 'dotenv' // https://www.npmjs.com/package/dotenv
import path from 'path' // https://nodejs.org/api/path.html
import csurf from 'csurf' // https://www.npmjs.com/package/csurf

// Local Imports
import indexRouter from './routes/index'
import apiRouter from './routes/api'
import jLog from './util/jLog' // My own custom logger
import config from './config' // DB Config file

// Env variable Setup
dotenv.config() // Initialize DotEnv to read .env variable
const portNumber = (process.env.PORT || 3000)
process.env.LOCAL_DIRNAME = __dirname

// Misc
const now = new Date() // For Logging
const spacer = '______________________________________________________________' // For Logging
let connectionResult

// A string array of 12 secret keys for session-cookie rotation
const twelveCookieKeys = [
  process.env.CK_1,
  process.env.CK_2,
  process.env.CK_3,
  process.env.CK_4,
  process.env.CK_5,
  process.env.CK_6,
  process.env.CK_7,
  process.env.CK_8,
  process.env.CK_9,
  process.env.CK_10,
  process.env.CK_11,
  process.env.CK_12
]

// Initialize Express server and configurations
var app = express()
app.use(compression())
app.set('trust proxy', true)
app.disable('x-powered-by')
app.use(helmet())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug') // Use PUG Template Engine for front-end
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Setup Mongoose/MongoDB configurations
db.Promise = Promise // Avoids confliction between Express & Mongoose Promise
db.set('useFindAndModify', false) // Forces mongoose to use findOneAndUpdate()
db.set('useUnifiedTopology', true) // @see https://mongoosejs.com/docs/deprecations.html

// Cookie Manager
app.use(cookieSesh({ // This middleware sets the Session Cookie
  name: 'es6boilerplate',
  maxAge: 31556952000, // 1 year
  keys: twelveCookieKeys,
  secure: process.env.NODE_ENV === 'production'
}))

// 1: PRE CSRF configuration Routes Setup
app.use('/api', apiRouter)

// CSRF configurations
app.use(csurf())
app.use((req, res, next) => {
  if ((req.secure && process.env.NODE_ENV === 'production') || (process.env.NODE_ENV === 'development')) {
    // Allow HTTP protocol on DEV Env ONLY
    res.locals._csrf = req.csrfToken()
    return next()
  } else {
    // Forces PROD Env to serve over HTTPS protocol ONLY
    const forceHttps = 'https://' + req.hostname + req.originalUrl
    jLog('Forcing Https://', forceHttps)
    res.locals._csrf = req.csrfToken()
    return res.redirect(302, forceHttps)
  }
})

// 2: POST CSRF configurations Routes Setup
app.use('/public', express.static(path.join(__dirname, '/public'))) // Set Public folder access
app.use('/', indexRouter)

// 3: Handle API Calls
app.use((e, req, res, next) => {
  if (!e) return next() // Continue if no errors
  var apiKey = req.originalUrl.split('/')
  try {
    if (e.code === 'EBADCSRFTOKEN' && apiKey[1] === 'api' && req.body.type) {
      switch (req.body.type) {
        case 'test':
          jLog('API Test Successful', req.body)
          return res.sendStatus(200)
        default:
          jLog('API Failed', req.body)
          return res.sendStatus(404)
      }
    } else {
      jLog('Error Passed To CSRF Handler', { body: req.body, Url: req.originalUrl })
      return next(e)
    }
  } catch (error) {
    jLog('Error Handle API Before CSRF', error)
    return next(e)
  }
})

// 4: Handle CSRF Token errors.
app.use((e, req, res, next) => {
  if (!e) return next() // Continue if no errors
  if (e.code === 'EBADCSRFTOKEN') { // CSRF ERROR HANDLER
    console.log(req.hostname.url)
    jLog('Error CSRF Forbidden Token Hit', { hostname: req.hostname.url })
    return res.redirect('/')
  } else return next(e)
})

// 5: Handle server errors with 500 Error response.
app.use((e, req, res, next) => {
  if (!e) return next()
  jLog('Error 500 thrown', { error: e })
  return res.status(500)
})

// 6: Handles 404 errors
app.use((req, res) => {
  jLog('Error 404 thrown', { Route: req.url })
  return res.status(404)
})

// 7: Emitted whenever a possibly unhandled rejection is detected.
process.on('unhandledRejection', (e, promise) => {
  return jLog('Unhandled Prom Rej Error', { Error: e, Promise: promise })
})

// 8: Initialize server and display status
startServer().finally(() => {
  console.log(`

>>>>>>>>>>>>>>>>>>>>> APP Started >>>>>>>>>>>>>>>>>>>>>>>>>>>>

            ES6 SETUP SUPPORT AVAILABLE HERE

 https://hackernoon.com/using-babel-7-with-node-7e401bc28b04
${spacer}\n
 Time: ${now.getHours()}:${now.getMinutes()} (${now.getSeconds()}s)  /  Date: ${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}
${spacer}\n 
 Server URL: http://localhost:${portNumber}
${spacer}\n 
 Debugger: "node --inspect" open chrome://inspect#devices
${spacer}\n
 ${connectionResult}
${spacer}\n 
 Env: ${process.env.NODE_ENV}
${spacer}\n
 Console Commands:
    * Close Server: Ctrl+c
    * Restart Server: rs (May need to enter this twice)
${spacer}\n
>>>>>>>>>>>>>>>>>>>> Server Running >>>>>>>>>>>>>>>>>>>>>>>>>>


`)
})

/**
 * * Acctempts to establish connection to DB.
 * * Then starts node server on predefined port with app.listen
 * * Logs any errors
 */
async function startServer () {
  const dbURL = config.configURL(process.env.NODE_ENV)
  console.log('\n\nConnecting to DB....Please Wait\n')
  // Check if DB Url connection string is valid
  if (!dbURL || dbURL === '' || dbURL === undefined) {
    connectionResult = 'DB Connection Status: Connection URL not provided'
    return app.listen(portNumber).on('error', async (e) => jLog('app.listen() Error', e))
  } else {
    await db.connect(dbURL, { useNewUrlParser: true })
      .then(() => {
        connectionResult = 'DB Connection Status: Successful'
        return app.listen(portNumber).on('error', async (e) => jLog('app.listen() Error', e))
      })
      .catch((e) => {
        jLog('Failed To Connect To DB', { ConnectionError: e.reason })
        connectionResult = 'DB Connection Status: FAILED (See above)'
        return app.listen(portNumber).on('error', async (e) => jLog('app.listen() Error', e))
      })
  }
}
