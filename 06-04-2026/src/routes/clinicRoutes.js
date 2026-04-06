import express from 'express'
import { clinicService } from '../services/clinic.service.js'

const route = express.Router()

// GET: Listar todas as clínicas
route.get("/", (req, res) => {
    const data = clinicService.getAll()
    res.json(data)
})

// POST: Criar nova clínica
route.post("/", (req, res) => {
    const { name, address, phone } = req.body
    if (!name || !address || !phone) {
        return res.status(400).json({ message: "name, address e phone são obrigatórios" })
    }
    try {
        const newClinic = clinicService.create({ name, address, phone })
        res.status(201).json(newClinic)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// GET: Buscar por ID
route.get("/:id", (req, res) => {
    const { id } = req.params
    const clinic = clinicService.getById(id)
    if (!clinic) return res.status(404).json({ message: "Clínica não encontrada" })
    res.json(clinic)
})

// PUT: Atualizar clínica existente
route.put("/:id", (req, res) => {
    const { id } = req.params
    const { name, address, phone } = req.body
    
    const updatedClinic = clinicService.update(id, { name, address, phone })
    if (!updatedClinic) return res.status(404).json({ message: "Clínica não encontrada" })
    
    res.json(updatedClinic)
})

// DELETE: Remover clínica
route.delete("/:id", (req, res) => {
    const { id } = req.params
    const deletedClinic = clinicService.delete(id)
    
    if (!deletedClinic) return res.status(404).json({ message: "Clínica não encontrada" })
    
    res.json({ message: `Clínica '${deletedClinic.name}' deletada com sucesso` })
})

export default route
