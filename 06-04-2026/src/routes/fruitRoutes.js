import express from 'express'
import { fruitService } from '../services/fruit.service.js'

const route = express.Router()

// GET: Listar todas
route.get("/", (req, res) => {
    const data = fruitService.getAll()
    res.json(data)
})

// POST: Criar nova
route.post("/", (req, res) => {
    const { nome } = req.body
    if (!nome) {
        return res.status(400).json({ message: "O nome da fruta é obrigatório" })
    }
    const newFruit = fruitService.create(nome)
    res.status(201).json(newFruit)
})

// GET: Buscar por ID
route.get("/:id", (req, res) => {
    const { id } = req.params
    const fruit = fruitService.getById(id)
    if (!fruit) return res.status(404).json({ message: "Fruta não encontrada" })
    res.json(fruit)
})

// PUT: Atualizar fruta existente
route.put("/:id", (req, res) => {
    const { id } = req.params
    const { nome } = req.body
    
    if (!nome) return res.status(400).json({ message: "O nome é obrigatório" })
    
    const updatedFruit = fruitService.update(id, nome)
    if (!updatedFruit) return res.status(404).json({ message: "Fruta não encontrada" })
    
    res.json(updatedFruit)
})

// DELETE: Remover fruta
route.delete("/:id", (req, res) => {
    const { id } = req.params
    const deletedFruit = fruitService.delete(id)
    
    if (!deletedFruit) return res.status(404).json({ message: "Fruta não encontrada" })
    
    res.json({ message: `Fruta '${deletedFruit.nome}' deletada com sucesso` })
})

export default route