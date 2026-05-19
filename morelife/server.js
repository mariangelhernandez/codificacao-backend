// ...existing code...
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

console.log('Iniciando servidor (modo MOCK de dados)...');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MOCK: conjunto de agendamentos em memória (substitui o sqlite)
const agendamentos = [
  { id: 1, nome: 'Ana Silva', email: 'ana.silva@example.com', especialidade: 'Clínico Geral', data: '2026-06-01', status: 'Confirmado' },
  { id: 2, nome: 'Bruno Costa', email: 'bruno.costa@example.com', especialidade: 'Odontologia', data: '2026-06-05', status: 'Pendente' },
  { id: 3, nome: 'Carla Dias', email: 'carla.dias@example.com', especialidade: 'Cardiologia', data: '2026-06-08', status: 'Pendente' }
];
let nextId = agendamentos.length + 1;

// Rota para listar agendamentos (útil para testes)
app.get('/api/agendamentos', (req, res) => {
  res.json({ success: true, data: agendamentos });
});

// ROTA: Salvar Agendamento (mock)
app.post('/api/agendar', (req, res) => {
  const { nome, email, especialidade, data } = req.body;
  if (!nome || !email || !especialidade || !data) {
    return res.status(400).json({ success: false, message: 'Campos faltando: nome, email, especialidade, data são obrigatórios.' });
  }

  const novo = {
    id: nextId++,
    nome,
    email,
    especialidade,
    data,
    status: 'Pendente'
  };

  agendamentos.push(novo);
  return res.json({ success: true, message: 'Agendamento (mock) criado com sucesso!', agendamento: novo });
});

// Atualizar status (mock)
app.put('/api/agendamentos/:id/status', (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const item = agendamentos.find(a => a.id === id);
  if (!item) return res.status(404).json({ success: false, message: 'Agendamento não encontrado.' });
  item.status = status || item.status;
  res.json({ success: true, message: 'Status atualizado (mock).', agendamento: item });
});

process.on('uncaughtException', (err) => console.error('uncaughtException:', err));
process.on('unhandledRejection', (reason) => console.error('unhandledRejection:', reason));

const server = app.listen(port, () => {
  console.log(`🚀 Servidor More Life (mock) rodando em http://localhost:${port}`);
});

server.on('error', (err) => {
  console.error('Erro do servidor:', err.message);
  process.exit(1);
});
// ...existing code...