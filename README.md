// ============================================================
// src/middlewares/validar.js — Regras de validacao
// ============================================================
// Aqui ficam as regras que verificam se o que o cliente mandou
// faz sentido ANTES do controller rodar.
//
// Regra de ouro: nunca confie em dados do cliente.
//   - O front-end pode estar com bug
//   - Alguem pode chamar a API direto pelo Thunder
//   - Validar no front e bom para UX, validar no back e seguranca
// ============================================================

const { body, validationResult } = require("express-validator");

// ----------------------------------------------------------
// Regras para CRIAR uma tarefa (POST)
// ----------------------------------------------------------
// body("nomeDoCampo") inicia uma cadeia de validacoes.
// Cada metodo (.notEmpty, .isLength, etc) acrescenta uma regra.
// withMessage define a mensagem de erro daquela regra.
const regrasCriarTarefa = [

  // Titulo: obrigatorio, texto, entre 3 e 100 caracteres
  body("titulo")
    .notEmpty().withMessage("Titulo e obrigatorio")
    .isString().withMessage("Titulo deve ser texto")
    .isLength({ min: 3, max: 100 })
    .withMessage("Titulo deve ter entre 3 e 100 caracteres")
    .trim(),  // remove espacos no comeco e fim

  // Descricao: opcional, mas se vier deve ser texto ate 500 chars
  body("descricao")
    .optional()
    .isString().withMessage("Descricao deve ser texto")
    .isLength({ max: 500 })
    .withMessage("Descricao deve ter no maximo 500 caracteres"),

  // Prioridade: opcional, mas se vier deve ser um dos valores aceitos
  body("prioridade")
    .optional()
    .isIn(["alta", "media", "baixa"])
    .withMessage("Prioridade deve ser: alta, media ou baixa"),

  // Concluida: opcional, mas se vier deve ser booleano
  body("concluida")
    .optional()
    .isBoolean().withMessage("Concluida deve ser true ou false")
];

// ----------------------------------------------------------
// Regras para ATUALIZAR PARCIALMENTE (PATCH)
// ----------------------------------------------------------
// PATCH e mais flexivel — todos os campos sao opcionais
// (porque o cliente pode mandar so um campo).
// Mas SE vierem, precisam estar no formato correto.
const regrasAtualizarTarefa = [
  body("titulo")
    .optional()
    .isString().withMessage("Titulo deve ser texto")
    .isLength({ min: 3, max: 100 })
    .withMessage("Titulo deve ter entre 3 e 100 caracteres")
    .trim(),

  body("descricao")
    .optional({ nullable: true })  // permite null explicitamente
    .isLength({ max: 500 })
    .withMessage("Descricao deve ter no maximo 500 caracteres"),

  body("prioridade")
    .optional()
    .isIn(["alta", "media", "baixa"])
    .withMessage("Prioridade deve ser: alta, media ou baixa"),

  body("concluida")
    .optional()
    .isBoolean().withMessage("Concluida deve ser true ou false")
];

// ----------------------------------------------------------
// Middleware que verifica se houve erros de validacao
// ----------------------------------------------------------
// As regras acima nao param a requisicao sozinhas — elas so MARCAM os erros.
// Esta funcao olha os erros marcados e, se houver algum, devolve 400.
const verificarErrosDeValidacao = (req, res, next) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    // Formata os erros para um JSON limpo:
    // [{ campo: "titulo", mensagem: "Titulo e obrigatorio" }, ...]
    const errosFormatados = erros.array().map(e => ({
      campo: e.path,
      mensagem: e.msg
    }));

    return res.status(400).json({
      erro: "Dados invalidos",
      detalhes: errosFormatados
    });
  }

  // Se nao houve erros, chama next() para passar para o proximo
  // middleware ou para o controller.
  next();
};

// ----------------------------------------------------------
// Exporta tudo para o arquivo de rotas usar
// ----------------------------------------------------------
module.exports = {
  regrasCriarTarefa,
  regrasAtualizarTarefa,
  verificarErrosDeValidacao
};
