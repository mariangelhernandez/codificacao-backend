import express from 'express';

const app = express();
app.use(express.json());

// Dados mocados de frutas
const frutas = [
  { id: 1, nome: 'Maçã', cor: 'Vermelha', preco: 5.00 },
  { id: 2, nome: 'Banana', cor: 'Amarela', preco: 3.50 },
  { id: 3, nome: 'Laranja', cor: 'Laranja', preco: 4.00 },
  { id: 4, nome: 'Uva', cor: 'Roxa', preco: 12.00 },
  { id: 5, nome: 'Morango', cor: 'Vermelha', preco: 15.00 }
];

// GET /frutas - getAll (dados mocados)
app.get('/frutas', (req, res) => {
  res.json({ success: true, data: frutas });
});

// GET /frutas/:id - getById (dados mocados)
app.get('/frutas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const fruta = frutas.find(f => f.id === id);
  if (fruta) {
    res.json({ success: true, data: fruta });
  } else {
    res.status(404).json({ success: false, error: 'Fruta não encontrada' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API de Frutas rodando em http://localhost:${PORT}`);
  console.log('Rotas: GET /frutas (getAll), GET /frutas/:id (getById)');
});

