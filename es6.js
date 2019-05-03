// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('@babel/polyfill')
require('babel-register')({ presets: [ 'env' ] })
require('dotenv').config() // Instructs dotenv module to load the .env file before and code is run
require('./config') // Load the DB config file
module.exports = require('./app.js') // Exports the rest of our application with the settings above.
