const express = require('express')
const routes = require('./routes')

const PORT = process.env.PORT || '3000'

const app = express()

app.use(express.json())

app.use('/api', routes)

if (process.env.ENABLE_SWAGGER) {
  const setupSwagger = require('./swagger');

  setupSwagger(app)
}

app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})

