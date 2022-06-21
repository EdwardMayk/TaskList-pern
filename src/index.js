const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 4000

const taskRoutes = require('./routes/task.routes')
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(taskRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  })
})

app.listen(PORT || 4000)
console.log('Server on port 4000')
