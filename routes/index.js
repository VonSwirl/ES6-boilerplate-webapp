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
  console.log('Homepage')
  return res.render('homepage.pug')
})

indexRouter.get('/privacy-policy', (req, res) => {
  console.log('Privacy')
  return res.render('privacy-policy.pug')
})

export default indexRouter
