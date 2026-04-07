# Exercício 2 — Respostas (PUT)

## Por que `PUT` é considerado uma substituição completa?
`PUT` substitui toda a representação do recurso pelo novo objeto enviado. O servidor descarta os dados antigos e usa exatamente o que foi fornecido (mantendo apenas o `id`).

## Qual é a diferença entre substituir e atualizar parcialmente?
PATCH aplica apenas as mudanças dos campos enviados — ou seja, atualiza só os campos presentes na requisição e preserva o restante do objeto. PUT substitui toda a representação do recurso pelo que foi enviado; campos omitidos no corpo da requisição normalmente são perdidos ou resetados.

## Se o objeto tivesse mais campos, o que poderia acontecer se eles não fossem enviados?
Campos omitidos podem ser removidos ou resetados dependendo da implementação; com `PUT` isso normalmente resulta na perda desses campos.

Exemplo prático:
- PATCH com {"preco":10} em `/fruits/1` altera só o preço e preserva os demais campos.
- PUT com {"nome":"Maçã","cor":"Vermelha","preco":10} em `/fruits/1` substitui todo o objeto.
