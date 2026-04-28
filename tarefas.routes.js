<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Taskschool — M4</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <h1>Taskschool</h1>
    <p class="subtitulo">Front-end consumindo a API REST (M4)</p>
  </header>

  <main>

    <!-- Formulario de criar tarefa -->
    <section class="card">
      <h2>Nova tarefa</h2>
      <form id="form-tarefa">
        <label>
          Titulo
          <input type="text" id="titulo" required minlength="3" maxlength="100">
        </label>

        <label>
          Descricao (opcional)
          <textarea id="descricao" maxlength="500"></textarea>
        </label>

        <label>
          Prioridade
          <select id="prioridade">
            <option value="alta">Alta</option>
            <option value="media" selected>Media</option>
            <option value="baixa">Baixa</option>
          </select>
        </label>

        <button type="submit">Criar tarefa</button>
      </form>
    </section>

    <!-- Filtros -->
    <section class="card">
      <h2>Filtros</h2>
      <div class="filtros">
        <button data-filtro="todas" class="ativo">Todas</button>
        <button data-filtro="pendentes">Pendentes</button>
        <button data-filtro="concluidas">Concluidas</button>
        <input type="search" id="busca" placeholder="Buscar no titulo...">
      </div>
    </section>

    <!-- Lista de tarefas -->
    <section class="card">
      <h2>Tarefas <span id="contador" class="badge">0</span></h2>
      <ul id="lista-tarefas">
        <!-- preenchido via JavaScript -->
      </ul>
    </section>

    <!-- Mensagens de feedback -->
    <div id="mensagem" class="mensagem oculta"></div>

  </main>

  <script src="app.js"></script>
</body>
</html>
