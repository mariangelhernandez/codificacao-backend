import express from 'express';
import fruitsRoute from './src/routes/fruitRoutes.js';


const app = express();
const port = 3000;

app.get('/fruits', fruitsRoute)

app.listen(port, () => {
    console.log(`O servidor está funcionando na porta: http://localhost:${port}`);
});