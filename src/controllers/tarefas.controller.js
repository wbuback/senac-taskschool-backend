let tarefas = [
  { id: 1, titulo: "Estudar Node.js", concluida: false }
];

export const listar = (req, res) => {
  res.json(tarefas); // Retorna a lista para o frontend [cite: 247]
};

export const criar = (req, res) => {
  const { titulo } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ erro: "Título é obrigatório" }); // Validação simples [cite: 164]
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa); // Status 201 = Criado [cite: 167, 168]
};