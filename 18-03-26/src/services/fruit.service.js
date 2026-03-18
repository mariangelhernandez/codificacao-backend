const fruits = [
    { id: 1, name: "Morango", cor: "Vermelha", preco: "10"},
    { id: 2, name: "Banana", cor: "Amarelo", preco: "10"},
  
];

 export class FruitService {
    getAll() {
        return fruits;
    }
}

export const fruitservice = new FruitService();