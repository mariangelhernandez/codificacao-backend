'use strict';

const express = require('express');
const router = express.Router();
const fruitsService = require('../services/fruitsService.js');

router.get('/', (req, res) => {
  try {
    const fruits = fruitsService.getAll();
    res.json({ success: true, data: fruits });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const fruit = fruitsService.getById(req.params.id);
    if (fruit) {
      res.json({ success: true, data: fruit });
    } else {
      res.status(404).json({ success: false, error: 'Fruta não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const newFruit = req.body;
    if (!newFruit.name || !newFruit.color || newFruit.stock == null) {
      return res.status(400).json({ success: false, error: 'Nome, cor e stock são obrigatórios' });
    }
    const created = fruitsService.create(newFruit);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const updated = fruitsService.update(req.params.id, req.body);
    if (updated) {
      res.json({ success: true, data: updated });
    } else {
      res.status(404).json({ success: false, error: 'Fruta não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deleted = fruitsService.delete(req.params.id);
    if (deleted) {
      res.json({ success: true, data: deleted });
    } else {
      res.status(404).json({ success: false, error: 'Fruta não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
