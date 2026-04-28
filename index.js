// ============================================================
// index.js — Ponto de entrada da aplicacao
// ============================================================
// Este e o arquivo que voce roda com 'node index.js' ou 'npm run dev'.
// Aqui montamos o servidor Express e ligamos as rotas.
// ============================================================

const express = require("express");
const cors = require("cors");

// Cria a aplicacao Express
const app = express();

// ----------------------------------------------------------
// MIDDLEWARES GLOBAIS
// ----------------------------------------------------------
// Middlewares sao funcoes que rodam ANTES das rotas.
// app.use() registra um middleware para TODAS as requisicoes.

// 1. CORS — permite que o front-end (em outra porta/dominio) chame esta API.
//    Sem isso, o navegador bloqueia o fetch por seguranca.
//    Em desenvolvimento liberamos tudo. Em producao, restrinja com:
//      app.use(cors({ origin: "https://seu-front.com" }))
app.use(cors());

// 2. express.json() — interpreta o body das requisicoes que vem em JSON.
//    Sem isso, req.body fica undefined em POST/PUT/PATCH.
app.use(express.json());

// 3. Servir os arquivos estaticos da pasta public/ (HTML/CSS/JS do front-end).
//    Acesse http://localhost:3000/ para ver o front-end de teste.
app.use(express.static("public"));

// ----------------------------------------------------------
// ROTAS
// ----------------------------------------------------------
// Toda requisicao para /tarefas vai para o arquivo de rotas.
app.use("/tarefas", require("./src/routes/tarefas.routes"));

// Rota raiz da API — util para confirmar que o servidor esta no ar.
app.get("/api", (req, res) => {
  res.json({
    nome: "Taskschool API",
    versao: "1.0.0",
    rotas: {
      "GET    /tarefas":      "lista todas (aceita filtros)",
      "GET    /tarefas/:id":  "busca uma tarefa por id",
      "POST   /tarefas":      "cria uma nova tarefa",
      "PUT    /tarefas/:id":  "substitui uma tarefa inteira",
      "PATCH  /tarefas/:id":  "atualiza campos de uma tarefa",
      "DELETE /tarefas/:id":  "remove uma tarefa"
    }
  });
});

// ----------------------------------------------------------
// TRATAMENTO DE ERRO 404 (rota nao encontrada)
// ----------------------------------------------------------
// Este middleware so roda se NENHUMA rota acima atendeu a requisicao.
app.use((req, res) => {
  res.status(404).json({
    erro: "Rota nao encontrada",
    caminho: req.originalUrl
  });
});

// ----------------------------------------------------------
// TRATAMENTO DE ERRO GLOBAL (com 4 parametros, o Express sabe que e um error handler)
// ----------------------------------------------------------
// Pega qualquer erro que escape dos controllers e devolve uma resposta padronizada.
// Sem isso, um erro nao tratado deixa o cliente sem resposta.
app.use((err, req, res, next) => {
  console.error("Erro nao tratado:", err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

// ----------------------------------------------------------
// INICIA O SERVIDOR
// ----------------------------------------------------------
const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`\n  Taskschool API rodando em http://localhost:${PORTA}`);
  console.log(`  Front-end de teste em http://localhost:${PORTA}/`);
  console.log(`  Documentacao da API em http://localhost:${PORTA}/api\n`);
});
