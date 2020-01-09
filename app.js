import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
// import config from './config' // For Future DB Config
import compression from 'compression'
import jLog from './util/jLog'
import dotenv from 'dotenv'
import path from 'path'
import indexRouter from './routes/index'
dotenv.config() // Initialize DotEnv to read .env variable
const now = new Date() // For Logging
const spacer = '______________________________________________________________' // For Logging
const portNumber = (process.env.PORT || 3000)

process.env.LOCAL_DIRNAME = __dirname

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
app.use('/public', express.static(path.join(__dirname, '/public'))) // Set Public folder access
app.use('/', indexRouter)

// 1: Sets CORS Remote Domian access.
app.use((req, res, next) => {
/*
  // CAN BE REMOVED IF NOT REQUIRED.
  var origin = req.headers.origin
  var allowedOrigins = ['<ADD>', '<ADD>', '<ADD>']
  if (allowedOrigins.indexOf(origin) > -1) res.setHeader('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
*/
  return next()
})

// 2: Handles server errors with 500 Error.
app.use((e, req, res, next) => {
  if (!e) return next()
  jLog('Error 500 thrown', { error: e })
  return res.status(500)
})

// 3: Handles 404 errors
app.use((req, res) => {
  jLog('Error 404 thrown', { Route: req.url })
  return res.status(404)
})

// 4: Emitted whenever a possibly unhandled rejection is detected.
process.on('unhandledRejection', (e, promise) => {
  return jLog('Unhandled Prom Rej Error', { Error: e, Promise: promise })
})

// 5: Initialize server
async function startUp () {
  app.listen(portNumber).on('error', async (e) => jLog('app.listen() Error', e))
}

// Start App and display status
startUp().finally(() => {
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
 Env: ${process.env.NODE_ENV}
${spacer}\n
>>>>>>>>>>>>>>>>>>>> Server Running >>>>>>>>>>>>>>>>>>>>>>>>>>



`)
})
