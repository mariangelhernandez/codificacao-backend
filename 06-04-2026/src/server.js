import express from 'express'
import clinicRoutes from './routes/clinicRoutes.js'

const app = express()
const port = 3000

// Middleware para ler JSON no corpo da requisição
app.use(express.json())

// Rotas principais
app.use("/clinics", clinicRoutes)

app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}/clinics`)
})