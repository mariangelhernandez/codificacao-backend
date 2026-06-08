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
