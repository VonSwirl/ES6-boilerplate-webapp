import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import config from './config'
import compression from 'compression'
import jLog from './util/jLog'
import indexRouter from './routes/index'
import cors from 'cors'
console.log('Good Skills')