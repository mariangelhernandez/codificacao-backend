// Mock de dados inicial
const fruits = [
    { id: 1, nome: "Maça" },
    { id: 2, nome: "Pera" }
]

class FruitService {
    // Retorna todas as frutas
    getAll() {
        return fruits
    }

    // Busca uma fruta específica pelo ID
    getById(id) {
        return fruits.find(f => f.id === parseInt(id))
    }

    // Cria uma nova fruta com ID incremental
    create(nome) {
        const newFruit = {
            id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
            nome
        }
        fruits.push(newFruit)
        return newFruit
    }

    // Atualiza uma fruta existente (Método PUT)
    update(id, nome) {
        const index = fruits.findIndex(f => f.id === parseInt(id))
        if (index !== -1) {
            fruits[index] = { id: parseInt(id), nome }
            return fruits[index]
        }
        return null
    }

    // Remove uma fruta do array (Método DELETE)
    delete(id) {
        const index = fruits.findIndex(f => f.id === parseInt(id))
        if (index !== -1) {
            // Remove o item e retorna o objeto removido
            return fruits.splice(index, 1)[0]
        }
        return null
    }
}

export const fruitService = new FruitService()