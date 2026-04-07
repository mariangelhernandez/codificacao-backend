const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { fruits, nextId } = require('./fruitsData');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const findFruit = (id) => fruits.find(f => f.id === parseInt(id));

const updateFruitId = (fruit) => ({ ...fruit, id: fruit.id || nextId++ });

// GET /fruits - list all
app.get('/fruits', (req, res) => {
  res.json(fruits);
});

// GET /fruits/:id - get one
app.get('/fruits/:id', (req, res) => {
  const fruit = findFruit(req.params.id);
  if (!fruit) return res.status(404).json({ error: 'Fruta não encontrada' });
  res.json(fruit);
});

// POST /fruits - create new
app.post('/fruits', (req, res) => {
  const newFruit = updateFruitId(req.body);
  fruits.push(newFruit);
  res.status(201).json(newFruit);
});

// PATCH /fruits/:id - partial update
app.patch('/fruits/:id', (req, res) => {
  const fruit = findFruit(req.params.id);
  if (!fruit) return res.status(404).json({ error: 'Fruta não encontrada' });
  Object.assign(fruit, req.body);
  res.json(fruit);
});

// PUT /fruits/:id - full replace
app.put('/fruits/:id', (req, res) => {
  const index = fruits.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Fruta não encontrada' });
  const updated = { id: parseInt(req.params.id), ...req.body };
  fruits[index] = updated;
  res.json(updated);
});

// DELETE /fruits/:id
app.delete('/fruits/:id', (req, res) => {
  const index = fruits.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Fruta não encontrada' });
  fruits.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log('Dados iniciais:', fruits);
});

module.exports = app;
