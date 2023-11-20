import express from 'express'
import { connectDB } from './database.js'
import routerUser from './routes/user.routes.js'

connectDB()

const app = express()

app.use(express.json())

app.use('/api', routerUser)

app.listen(3000)

console.log('Server corriendo en el puerto 3000')
