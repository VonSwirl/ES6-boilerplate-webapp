import express from 'express'
// import cors from 'cors'
const apiRouter = express.Router()

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

apiRouter.get('/', (req, res) => {
  console.log('API Route')
  res.json('API Route')
})

export default apiRouter
