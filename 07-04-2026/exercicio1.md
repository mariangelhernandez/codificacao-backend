
  ## Exercício 1 — Respostas (PATCH)

  ## Por que `PATCH` é a melhor escolha nesse caso?
  `PATCH` é a escolha ideal porque permite atualizar apenas o campo `nome` sem afetar outros campos existentes como `cor` ou `preco`. É eficiente para mudanças pequenas e preserva dados não mencionados.

  ## O que significa atualização parcial?
  Atualização parcial significa modificar somente os campos enviados na requisição mantendo todos os outros campos do recurso com seus valores originais no servidor.

  ## O que acontece quando você envia apenas um campo?
  - Apenas esse campo é alterado
  - Campos não enviados permanecem inalterados
  - Exemplo com dados estendidos:
    
    PATCH /fruits/1 {"preco": 7}

    Resultado: {"id":1, "nome":"Maçã", "cor":"Vermelha", "preco":7} (cor preservada)
    
