'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fruitsRoutes = require('./routes/fruitsRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/fruits', fruitsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'API Frutas OK', timestamp: new Date().toISOString() });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Erro interno do servidor' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 API Frutas rodando em http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🍎 Frutas: http://localhost:${PORT}/api/fruits`);
});
