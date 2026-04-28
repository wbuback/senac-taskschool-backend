# Taskschool — Projeto do M4

Projeto da UC3 — SENAC Programador Web. API REST em Node.js + Express com CRUD completo, validação e front-end de teste.

## O que tem aqui

- **Backend** com Express: rotas REST para criar, listar, buscar, atualizar e remover tarefas
- **Validação** com express-validator (regras declarativas + middleware)
- **CORS** habilitado para integração com front-end em outra origem
- **Front-end de teste** em HTML/CSS/JS puro consumindo a API com fetch
- **Tratamento de erros** consistente em formato JSON

## Como rodar

```bash
# 1. Instalar as dependências
npm install

# 2. Rodar em modo desenvolvimento (reinicia automaticamente ao salvar)
npm run dev

# Ou rodar em modo normal
npm start
```

Acesse:
- Front-end de teste: http://localhost:3000/
- Documentação da API: http://localhost:3000/api
- API direta: http://localhost:3000/tarefas

## Estrutura de pastas

```
taskschool-m4/
├── src/
│   ├── routes/
│   │   └── tarefas.routes.js       ← define as URLs disponíveis
│   ├── controllers/
│   │   └── tarefas.controller.js   ← lógica de cada rota (CRUD)
│   └── middlewares/
│       └── validar.js              ← regras de validação
├── public/
│   ├── index.html                  ← front-end de teste
│   ├── style.css
│   └── app.js                      ← consome a API com fetch
├── index.js                        ← ponto de entrada do servidor
├── package.json
└── .gitignore
```

## Endpoints da API

| Método | URL | O que faz |
|---|---|---|
| GET    | /tarefas | Lista todas (aceita filtros via query string) |
| GET    | /tarefas/:id | Busca uma tarefa por id |
| POST   | /tarefas | Cria uma nova tarefa |
| PUT    | /tarefas/:id | Substitui uma tarefa inteira |
| PATCH  | /tarefas/:id | Atualiza campos de uma tarefa |
| DELETE | /tarefas/:id | Remove uma tarefa |

### Filtros suportados em GET /tarefas

- `?concluida=true` — só concluídas
- `?concluida=false` — só pendentes
- `?prioridade=alta` — por prioridade
- `?busca=Node` — busca textual no título
- Pode combinar: `?concluida=false&prioridade=alta`

### Estrutura de uma tarefa

```json
{
  "id": 1,
  "titulo": "Estudar Node.js",
  "descricao": "Revisar conceitos de módulos",
  "prioridade": "alta",
  "concluida": false,
  "criada_em": "2026-04-28T10:00:00.000Z"
}
```

### Formato de erro padrão

```json
{
  "erro": "Dados invalidos",
  "detalhes": [
    { "campo": "titulo", "mensagem": "Titulo é obrigatorio" }
  ]
}
```

## Testando a API

### Com Thunder Client (extensão do VS Code)

1. Crie uma nova request
2. Use os endpoints acima
3. Para POST/PUT/PATCH, na aba Body escolha JSON e use:

```json
{
  "titulo": "Minha tarefa",
  "prioridade": "alta",
  "descricao": "Descrição opcional"
}
```

### Com cURL

```bash
# Listar
curl http://localhost:3000/tarefas

# Filtrar
curl "http://localhost:3000/tarefas?concluida=false&prioridade=alta"

# Criar
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Estudar SQL","prioridade":"alta"}'

# Atualizar parcialmente
curl -X PATCH http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"concluida":true}'

# Remover
curl -X DELETE http://localhost:3000/tarefas/1
```

## Conceitos demonstrados

- **Express básico**: app, middlewares, rotas
- **Roteamento modular**: `express.Router()` em arquivo separado
- **Padrão MVC simplificado**: routes → controllers → (no M5: model)
- **Métodos HTTP corretos**: GET para ler, POST para criar, PATCH/PUT para atualizar, DELETE para remover
- **Status codes apropriados**: 200, 201, 204, 400, 404, 500
- **Validação no servidor**: regras declarativas com express-validator
- **Tratamento de erro centralizado**: 404 para rota não encontrada + handler global
- **CORS**: por que existe e como habilitar
- **fetch no front**: GET, POST com JSON, PATCH, DELETE
- **Filtros via query string**: `req.query`
- **Path params**: `req.params.id`

## Próximos passos (M5)

No M4, as tarefas vivem em um array em memória — quando o servidor reinicia, somem. No M5 vamos trocar por SQLite, mantendo o resto do código praticamente intacto.

## Possíveis exercícios para os alunos

1. Adicionar um campo `tags` (array de strings) e suportar busca por tag
2. Implementar paginação: `?limit=10&offset=20`
3. Adicionar ordenação: `?ordem=criada_em` ou `?ordem=prioridade`
4. Criar uma rota nova: `GET /tarefas/estatisticas` retornando contagem por prioridade
5. Criar `PATCH /tarefas/:id/concluir` como atalho para marcar como concluída
