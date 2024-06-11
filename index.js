import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { router as roommatesRoutes } from './routes/roommates.js'
import { router as gastosRoutes } from './routes/gastos.js'

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json());
app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});


// Rutas roommates y gastos
app.use('/roommates', roommatesRoutes)
app.use('/gastos', gastosRoutes)

app.listen(3000, () => {
    console.log("App corriendo en el puerto 3000")
})
