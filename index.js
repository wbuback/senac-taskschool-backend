import express from 'express';
import cors from 'cors';
import tarefasRoutes from './src/routes/tarefas.routes.js';

const app = express();

// Middlewares obrigatórios
app.use(cors());
app.use(express.json()); // Permite ler o corpo das requisições POST 

// Rotas da aplicação
app.use('/tarefas', tarefasRoutes); // Agrupa todas as rotas de tarefas [cite: 202]

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Taskschool rodando em http://localhost:${PORT}`);
});