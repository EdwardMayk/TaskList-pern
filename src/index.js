const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const taskRoutes = require('./routes/task.routes')
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, 'client/src')))
}
app.use('/', express.static('./client/src'))

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(taskRoutes)

app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  })
})

app.listen(process.env.PORT || 4000)
console.log('Server on port 4000')
