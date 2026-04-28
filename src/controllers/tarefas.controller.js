// ============================================================
// src/controllers/tarefas.controller.js — Logica do CRUD
// ============================================================
// Cada funcao aqui responde a uma rota especifica.
// Padrao: (req, res) => { ... res.json(...) }
//
// req: a requisicao que o cliente enviou (com params, body, query)
// res: a resposta que vamos devolver para o cliente
//
// IMPORTANTE: No M4 guardamos as tarefas em um array em memoria.
// Quando o servidor reiniciar, os dados somem — isso muda no M5,
// quando trocamos por SQLite.
// ============================================================

// ----------------------------------------------------------
// "BANCO DE DADOS" EM MEMORIA
// ----------------------------------------------------------
// 'let' porque vamos modificar (adicionar, remover, atualizar)
let tarefas = [
  {
    id: 1,
    titulo: "Estudar Node.js",
    descricao: "Revisar conceitos de modulos e npm",
    prioridade: "alta",
    concluida: false,
    criada_em: "2026-04-28T10:00:00.000Z"
  },
  {
    id: 2,
    titulo: "Criar API REST",
    descricao: "Implementar CRUD completo do Taskschool",
    prioridade: "alta",
    concluida: false,
    criada_em: "2026-04-28T11:00:00.000Z"
  },
  {
    id: 3,
    titulo: "Testar com Thunder Client",
    descricao: null,
    prioridade: "media",
    concluida: true,
    criada_em: "2026-04-27T09:00:00.000Z"
  }
];

// Proximo id disponivel — comeca em 4 porque ja temos ids 1, 2, 3
let proximoId = 4;

// ----------------------------------------------------------
// GET /tarefas — listar todas (com filtros opcionais)
// ----------------------------------------------------------
// Filtros suportados via query string:
//   /tarefas?concluida=true          (so concluidas)
//   /tarefas?prioridade=alta         (so de uma prioridade)
//   /tarefas?busca=Node              (titulo contem "Node")
//   /tarefas?concluida=false&prioridade=alta   (combinando)
const listar = (req, res) => {
  // Comecamos com uma copia do array completo
  let resultado = [...tarefas];

  // Filtro 1: concluida — vem como string "true" ou "false"
  if (req.query.concluida !== undefined) {
    const querConcluidas = req.query.concluida === "true";
    resultado = resultado.filter(t => t.concluida === querConcluidas);
  }

  // Filtro 2: prioridade
  if (req.query.prioridade) {
    resultado = resultado.filter(t => t.prioridade === req.query.prioridade);
  }

  // Filtro 3: busca textual no titulo (case-insensitive)
  if (req.query.busca) {
    const termo = req.query.busca.toLowerCase();
    resultado = resultado.filter(t =>
      t.titulo.toLowerCase().includes(termo)
    );
  }

  // Devolve o resultado como JSON. Status 200 e implicito.
  res.json(resultado);
};

// ----------------------------------------------------------
// GET /tarefas/:id — buscar uma tarefa por id
// ----------------------------------------------------------
const buscarPorId = (req, res) => {
  // req.params.id vem como STRING (porque vem da URL).
  // parseInt converte para numero antes de comparar.
  const id = parseInt(req.params.id);

  const tarefa = tarefas.find(t => t.id === id);

  // Se nao encontrou, devolve 404 (Not Found)
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa nao encontrada" });
  }

  res.json(tarefa);
};

// ----------------------------------------------------------
// POST /tarefas — criar uma nova tarefa
// ----------------------------------------------------------
// Os dados chegam em req.body.
// As validacoes ja rodaram no middleware antes do controller.
const criar = (req, res) => {
  // Extrai os campos esperados do body (desestruturacao)
  const { titulo, descricao, prioridade } = req.body;

  // Monta o objeto da nova tarefa.
  // O id vem do contador, criada_em e gerado agora,
  // concluida comeca sempre como false.
  const novaTarefa = {
    id: proximoId++,                    // pega o id e ja incrementa
    titulo: titulo,
    descricao: descricao || null,       // se nao veio, vira null
    prioridade: prioridade || "media",  // padrao se nao informou
    concluida: false,
    criada_em: new Date().toISOString()
  };

  // Adiciona ao "banco" (nosso array)
  tarefas.push(novaTarefa);

  // 201 Created e o status correto para POST que criou um recurso.
  // Devolvemos a tarefa completa para o cliente saber o id gerado.
  res.status(201).json(novaTarefa);
};

// ----------------------------------------------------------
// PUT /tarefas/:id — substituir uma tarefa INTEIRA
// ----------------------------------------------------------
// PUT exige que TODOS os campos venham. O que nao vier, vira o padrao.
const substituir = (req, res) => {
  const id = parseInt(req.params.id);
  const indice = tarefas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Tarefa nao encontrada" });
  }

  const { titulo, descricao, prioridade, concluida } = req.body;

  // Substituimos a tarefa inteira (mantendo so o id original)
  tarefas[indice] = {
    id: id,
    titulo: titulo,
    descricao: descricao || null,
    prioridade: prioridade || "media",
    concluida: concluida === true,           // forca booleano
    criada_em: tarefas[indice].criada_em     // preserva data de criacao
  };

  res.json(tarefas[indice]);
};

// ----------------------------------------------------------
// PATCH /tarefas/:id — atualizar PARCIALMENTE
// ----------------------------------------------------------
// PATCH atualiza so os campos que vieram no body.
// Os outros ficam como estavam.
const atualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa nao encontrada" });
  }

  // Object.assign mistura os campos: pega o que veio em req.body
  // e sobrescreve nos campos da tarefa. Os ausentes ficam.
  // Lista branca de campos que podem ser atualizados (mais seguro):
  const camposPermitidos = ["titulo", "descricao", "prioridade", "concluida"];

  for (const campo of camposPermitidos) {
    if (req.body[campo] !== undefined) {
      tarefa[campo] = req.body[campo];
    }
  }

  res.json(tarefa);
};

// ----------------------------------------------------------
// DELETE /tarefas/:id — remover uma tarefa
// ----------------------------------------------------------
const remover = (req, res) => {
  const id = parseInt(req.params.id);
  const indice = tarefas.findIndex(t => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Tarefa nao encontrada" });
  }

  // splice(posicao, quantidade) remove 'quantidade' itens a partir da 'posicao'
  tarefas.splice(indice, 1);

  // 204 No Content: deu certo, sem nada para devolver.
  // .send() com 204 fecha a resposta sem body.
  res.status(204).send();
};

// ----------------------------------------------------------
// Exporta as funcoes para o arquivo de rotas usar
// ----------------------------------------------------------
module.exports = {
  listar,
  buscarPorId,
  criar,
  substituir,
  atualizar,
  remover
};
