const express = require('express')
const routes = require('./routes')
const setupSwagger = require('./swagger');

const PORT = process.env.PORT || '3000'

const app = express()

app.use(express.json())

app.use('/api', routes)

setupSwagger(app)

app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})

