import express from 'express';
import { fruitservice } from '../services/fruit.service.js';
 const router = express.Router();

 router.get("/", (req, res) => {
    const dado = fruitservice.getAll();
      res.json(dado);
 });

 export default router;

 //BD> Services> Routes> Services.js> Front-end