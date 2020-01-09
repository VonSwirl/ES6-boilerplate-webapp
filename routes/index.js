import express from 'express'
// import cors from 'cors'
const indexRouter = express.Router()

/* CORS Config if needed
  const corsOptions = {
  methods: ['GET', 'POST'],
  origin: ['<ADD DOMAIN HERE>'],
  optionsSuccessStatus: 200
}

indexRouter.get('/', cors(corsOptions), (req, res) => {
  return res.sendStatus(404)
})
*/

indexRouter.get('/', (req, res) => {
  return res.sendStatus(404)
})

export default indexRouter
