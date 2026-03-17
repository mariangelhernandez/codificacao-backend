import express from 'express';

const app = express();
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Node.js + Express configurada com sucesso!',
    version: '1.0.0',
    endpoints: ['GET /', 'GET /health']
  });
});

// Rota health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`API Node rodando em http://localhost:${PORT}`);
  console.log('Endpoints: /, /health');
});


