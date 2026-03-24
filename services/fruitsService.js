 'use strict';

let fruits = [
  { id: 1, name: 'Maçã', color: 'vermelha', stock: 10 },
  { id: 2, name: 'Banana', color: 'amarela', stock: 15 },
  { id: 3, name: 'Laranja', color: 'laranja', stock: 8 }
];

let nextId = 4;

const fruitsService = {
  getAll: () => fruits,

  getById: (id) => fruits.find(f => f.id === parseInt(id)),

  create: (newFruit) => {
    const fruit = { id: nextId++, ...newFruit };
    fruits.push(fruit);
    return fruit;
  },

  update: (id, updatedFruit) => {
    const index = fruits.findIndex(f => f.id === parseInt(id));
    if (index !== -1) {
      fruits[index] = { ...fruits[index], ...updatedFruit };
      return fruits[index];
    }
    return null;
  },

  delete: (id) => {
    const index = fruits.findIndex(f => f.id === parseInt(id));
    if (index !== -1) {
      const deleted = fruits.splice(index, 1)[0];
      return deleted;
    }
    return null;
  }
};

module.exports = fruitsService;
