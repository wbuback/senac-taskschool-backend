// ============================================================
// src/routes/tarefas.routes.js — Roteador das tarefas
// ============================================================
// Aqui dizemos: quando o Express receber uma requisicao para /tarefas,
// QUAL funcao do controller deve ser chamada?
//
// Pense neste arquivo como um "indice": cada linha conecta um
// metodo HTTP + caminho a uma funcao que faz o trabalho.
// ============================================================

const express = require("express");
const router = express.Router();

// Importa as funcoes do controller (a logica de cada rota)
const c = require("../controllers/tarefas.controller");

// Importa as regras de validacao e o middleware que verifica os erros
const {
  regrasCriarTarefa,
  regrasAtualizarTarefa,
  verificarErrosDeValidacao
} = require("../middlewares/validar");

// ----------------------------------------------------------
// MAPEAMENTO DAS ROTAS
// ----------------------------------------------------------
// Cada router.metodo("/caminho", ...middlewares, handler):
//   - "/"      → corresponde a /tarefas
//   - "/:id"   → corresponde a /tarefas/123 (o :id vira req.params.id)
//
// Antes do controller, podemos passar middlewares (ex: validacao).
// O Express executa eles em ordem; se um chamar res.status(...).json(...),
// a cadeia para ali e o controller nao roda.
// ----------------------------------------------------------

// Listar todas (aceita filtros via query string)
router.get("/", c.listar);

// Buscar uma tarefa por id
router.get("/:id", c.buscarPorId);

// Criar uma nova tarefa
//   1. regrasCriarTarefa: aplica as regras (titulo obrigatorio, etc)
//   2. verificarErrosDeValidacao: se algum erro, devolve 400
//   3. c.criar: se chegou aqui, esta tudo valido — cria a tarefa
router.post("/", regrasCriarTarefa, verificarErrosDeValidacao, c.criar);

// Substituir uma tarefa inteira (PUT)
router.put("/:id", regrasCriarTarefa, verificarErrosDeValidacao, c.substituir);

// Atualizar parcialmente (PATCH) — regras mais flexiveis
router.patch("/:id", regrasAtualizarTarefa, verificarErrosDeValidacao, c.atualizar);

// Remover
router.delete("/:id", c.remover);

// Exporta para o index.js conseguir usar com app.use("/tarefas", ...)
module.exports = router;
