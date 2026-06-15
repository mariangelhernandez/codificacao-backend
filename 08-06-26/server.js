import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const PORT = process.env.PORT || 3000;

// CONFIGURAÇAÕ PARA LER json NO CORPO DAS REQUISIÇÕES 

let chats = [
  {
    id: "order-101",
    orderStatus: "A caminho",
    driver: { name: "João", phone: "(11) 99999-9999" },
    customer: { name: "Maria" },
    messages: [
      { id: 1, sender: "system", text: "Pedido em processo", timestamp: "20:20" },
      { id: 2, sender: "driver", text: "Estou a caminho", timestamp: "20:30" }
    ]
  }
];


// ROTAS DE API //

// lista de todos os chats //
app.get('/api/chats', (req, res) => {
    const chat = chats.find(c => c.id === req.params.orderId);
    res.json(chat);
});


// buscar detalhes de um chat específico //
app.get('/api/chats/:orderId', (req, res) => {
    const chat = chats.find(c => c.id === req.params.orderId);
    if (!chat) {
        return res.status(404).json({ error: 'Chat não encontrado' });
    }
});

// enviar uma messagem nova //
app.post('/api/chats/:orderId/messages', (req, res) => {
    const {orderId} = req.params;
    const {sender, text} = req.body;
    if (!sender || !text) {
        return res.status(404).json({ error: 'Os campos sender e text sâo encontrados' });
    }
    const chat = chats.find(c => c.id === orderId);
    if (!chat) {
        return res.status(404).json({ error: 'Chat não encontrado' });
    }
    
});


  // gerando um timestamp simples
  const now = new Date();
  const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newMessage = {
    id: (chat.messages?.length || 0) + 1,
    sender,
    text,
    timestamp
  };

  chat.messages = chat.messages || [];
  chat.messages.push(newMessage);

  return res.status(201).json(newMessage);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta em: http://localhost: ${PORT}`);
});




