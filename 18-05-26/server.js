const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve os arquivos da pasta public

let notas = []; // Banco de dados temporário (em memória)

// Rota para buscar todas as notas
app.get('/api/notas', (req, res) => {
    res.json(notas);
});

// Rota para salvar uma nova nota
app.post('/api/notas', (req, res) => {
    const { texto } = req.body;
    const novaNota = { id: Date.now(), texto };
    notas.push(novaNota);
    res.status(201).json(novaNota);
});

// Rota para deletar uma nota
app.delete('/api/notas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    notas = notas.filter(n => n.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});