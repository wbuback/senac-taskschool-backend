/* ============================================================
   style.css — Estilos do front-end de teste
   Bem simples de proposito — o foco do M4 e o backend.
   ============================================================ */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, "Segoe UI", Roboto, sans-serif;
  background: #f3f4f6;
  color: #1f2937;
  line-height: 1.5;
  padding: 20px;
}

header {
  max-width: 720px;
  margin: 0 auto 24px;
  text-align: center;
}

header h1 {
  font-size: 32px;
  color: #2563eb;
}

.subtitulo {
  color: #6b7280;
  font-size: 14px;
}

main {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Cards */
.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card h2 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #1f2937;
}

/* Formulario */
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #374151;
}

input, textarea, select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

textarea {
  resize: vertical;
  min-height: 60px;
}

button {
  padding: 8px 16px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

/* Filtros */
.filtros {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filtros button {
  background: #f3f4f6;
  color: #374151;
}

.filtros button.ativo {
  background: #2563eb;
  color: white;
}

.filtros input {
  flex: 1;
  min-width: 180px;
}

/* Lista de tarefas */
#lista-tarefas {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tarefa {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  border-left: 4px solid #d1d5db;
}

.tarefa.alta   { border-left-color: #ef4444; }
.tarefa.media  { border-left-color: #f59e0b; }
.tarefa.baixa  { border-left-color: #10b981; }

.tarefa.concluida {
  opacity: 0.6;
}

.tarefa.concluida .titulo {
  text-decoration: line-through;
}

.tarefa input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
}

.tarefa-conteudo {
  flex: 1;
}

.tarefa .titulo {
  font-weight: 600;
  font-size: 15px;
}

.tarefa .descricao {
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
}

.tarefa .meta {
  display: flex;
  gap: 8px;
  margin-top: 6px;
  font-size: 12px;
  color: #9ca3af;
}

.tarefa .acoes {
  display: flex;
  gap: 4px;
}

.tarefa .acoes button {
  padding: 4px 8px;
  font-size: 12px;
  background: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.tarefa .acoes button:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #dc2626;
}

.badge {
  display: inline-block;
  background: #2563eb;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 8px;
}

/* Mensagem flutuante de feedback */
.mensagem {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s;
}

.mensagem.sucesso {
  background: #d1fae5;
  color: #065f46;
  border-left: 4px solid #10b981;
}

.mensagem.erro {
  background: #fee2e2;
  color: #991b1b;
  border-left: 4px solid #ef4444;
}

.mensagem.oculta {
  opacity: 0;
  pointer-events: none;
}

.vazio {
  text-align: center;
  color: #9ca3af;
  padding: 24px;
  font-size: 14px;
}
