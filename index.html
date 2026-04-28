// ============================================================
// app.js — Front-end consumindo a API REST
// ============================================================
// Aqui mostramos como usar fetch para todas as operacoes do CRUD:
// listar, criar, atualizar e remover.
// ============================================================

// URL base da API. Como o front esta sendo servido pelo proprio
// Express na mesma porta, podemos usar caminho relativo.
// Se voce abrir o front no Live Server (porta 5500), troque para:
//   const API_URL = "http://localhost:3000";
const API_URL = "";

// Estado simples do filtro ativo
let filtroAtivo = "todas";

// ============================================================
// FUNCOES QUE FALAM COM A API (usando fetch)
// ============================================================

// Listar tarefas (com filtros via query string)
async function carregarTarefas() {
  // Monta a query string baseada no filtro escolhido
  const params = new URLSearchParams();

  if (filtroAtivo === "concluidas") params.append("concluida", "true");
  if (filtroAtivo === "pendentes")  params.append("concluida", "false");

  const busca = document.getElementById("busca").value.trim();
  if (busca) params.append("busca", busca);

  // URL final fica tipo: /tarefas?concluida=false&busca=Node
  const url = `${API_URL}/tarefas?${params.toString()}`;

  try {
    const resposta = await fetch(url);

    // Sempre verifique se a resposta foi bem-sucedida
    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}`);
    }

    const tarefas = await resposta.json();
    renderizarTarefas(tarefas);

  } catch (erro) {
    console.error("Falha ao carregar tarefas:", erro);
    mostrarMensagem("Nao foi possivel carregar as tarefas", "erro");
  }
}

// Criar uma nova tarefa
async function criarTarefa(dados) {
  try {
    const resposta = await fetch(`${API_URL}/tarefas`, {
      method: "POST",
      headers: {
        // OBRIGATORIO quando enviamos JSON. Sem isso o Express
        // nao consegue ler o body.
        "Content-Type": "application/json"
      },
      // Converte o objeto JS para string JSON
      body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
      // O servidor mandou um erro — vamos ler a mensagem
      const erro = await resposta.json();
      throw new Error(formatarErro(erro));
    }

    const tarefaCriada = await resposta.json();
    mostrarMensagem(`Tarefa "${tarefaCriada.titulo}" criada!`, "sucesso");
    return tarefaCriada;

  } catch (erro) {
    console.error("Falha ao criar tarefa:", erro);
    mostrarMensagem(erro.message || "Erro ao criar tarefa", "erro");
    throw erro;
  }
}

// Atualizar uma tarefa parcialmente (PATCH)
async function atualizarTarefa(id, dados) {
  try {
    const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(formatarErro(erro));
    }

    return await resposta.json();

  } catch (erro) {
    console.error("Falha ao atualizar:", erro);
    mostrarMensagem(erro.message || "Erro ao atualizar", "erro");
    throw erro;
  }
}

// Remover uma tarefa
async function excluirTarefa(id) {
  try {
    const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
      method: "DELETE"
      // DELETE nao precisa de body nem Content-Type
    });

    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}`);
    }

    // 204 No Content nao tem body — nao chamamos resposta.json() aqui

  } catch (erro) {
    console.error("Falha ao excluir:", erro);
    mostrarMensagem("Erro ao excluir tarefa", "erro");
    throw erro;
  }
}

// ============================================================
// FUNCOES DE INTERFACE
// ============================================================

// Pega a lista de tarefas e renderiza na tela
function renderizarTarefas(tarefas) {
  const ul = document.getElementById("lista-tarefas");
  const contador = document.getElementById("contador");

  contador.textContent = tarefas.length;

  // Lista vazia — mostra mensagem
  if (tarefas.length === 0) {
    ul.innerHTML = '<p class="vazio">Nenhuma tarefa por aqui.</p>';
    return;
  }

  // Limpa a lista atual e cria os elementos novos
  ul.innerHTML = "";

  for (const tarefa of tarefas) {
    const li = document.createElement("li");
    li.className = `tarefa ${tarefa.prioridade}`;
    if (tarefa.concluida) li.classList.add("concluida");

    li.innerHTML = `
      <input type="checkbox" ${tarefa.concluida ? "checked" : ""}>
      <div class="tarefa-conteudo">
        <div class="titulo">${escapar(tarefa.titulo)}</div>
        ${tarefa.descricao ? `<div class="descricao">${escapar(tarefa.descricao)}</div>` : ""}
        <div class="meta">
          <span>#${tarefa.id}</span>
          <span>·</span>
          <span>${tarefa.prioridade}</span>
          <span>·</span>
          <span>${formatarData(tarefa.criada_em)}</span>
        </div>
      </div>
      <div class="acoes">
        <button class="btn-excluir">Excluir</button>
      </div>
    `;

    // Checkbox: marca/desmarca como concluida
    const checkbox = li.querySelector("input[type=checkbox]");
    checkbox.addEventListener("change", async () => {
      await atualizarTarefa(tarefa.id, { concluida: checkbox.checked });
      carregarTarefas();
    });

    // Botao Excluir
    const btnExcluir = li.querySelector(".btn-excluir");
    btnExcluir.addEventListener("click", async () => {
      if (!confirm(`Excluir "${tarefa.titulo}"?`)) return;
      await excluirTarefa(tarefa.id);
      carregarTarefas();
    });

    ul.appendChild(li);
  }
}

// Mostra uma mensagem flutuante por 3 segundos
function mostrarMensagem(texto, tipo = "sucesso") {
  const div = document.getElementById("mensagem");
  div.textContent = texto;
  div.className = `mensagem ${tipo}`;

  setTimeout(() => {
    div.classList.add("oculta");
  }, 3000);
}

// Helper: pega os erros formatados do back e vira uma string legivel
function formatarErro(erro) {
  if (erro.detalhes && erro.detalhes.length > 0) {
    return erro.detalhes.map(d => d.mensagem).join(", ");
  }
  return erro.erro || "Erro desconhecido";
}

// Helper: escapa HTML para evitar que titulos com < ou > quebrem a pagina
function escapar(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

// Helper: formata data ISO para algo legivel em pt-BR
function formatarData(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR") + " " + d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

// ============================================================
// EVENT LISTENERS — conectando os elementos da pagina
// ============================================================

// Form de criar tarefa
document.getElementById("form-tarefa").addEventListener("submit", async (e) => {
  // Evita o comportamento padrao (recarregar a pagina)
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const prioridade = document.getElementById("prioridade").value;

  // Monta o objeto que vai virar JSON na requisicao
  const dados = {
    titulo,
    prioridade
  };

  // Descricao so vai se foi preenchida
  if (descricao.trim()) {
    dados.descricao = descricao;
  }

  try {
    await criarTarefa(dados);
    e.target.reset();           // limpa o formulario
    carregarTarefas();          // recarrega a lista
  } catch {
    // Erro ja foi mostrado pela funcao criarTarefa
  }
});

// Botoes de filtro
document.querySelectorAll(".filtros button[data-filtro]").forEach(btn => {
  btn.addEventListener("click", () => {
    // Tira a classe ativo de todos
    document.querySelectorAll(".filtros button").forEach(b => b.classList.remove("ativo"));
    // Coloca em quem foi clicado
    btn.classList.add("ativo");

    filtroAtivo = btn.dataset.filtro;
    carregarTarefas();
  });
});

// Campo de busca — recarrega ao digitar (com pequeno delay)
let timerBusca;
document.getElementById("busca").addEventListener("input", () => {
  clearTimeout(timerBusca);
  // Espera 300ms parado pra nao chamar a API a cada tecla
  timerBusca = setTimeout(() => carregarTarefas(), 300);
});

// ============================================================
// INICIALIZACAO — quando a pagina abrir, carrega as tarefas
// ============================================================
document.addEventListener("DOMContentLoaded", carregarTarefas);
