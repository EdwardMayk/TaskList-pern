const { Pool } = require('pg')
const { db } = require('./config')

const pool = new Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
})
// const devConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// const proConfig = process.env.DATABASE_URL

// const pool = new Pool({
//   connectionString:
//     process.env.NODE_ENV === 'production' ? proConfig : devConfig,
// })

module.exports = pool
