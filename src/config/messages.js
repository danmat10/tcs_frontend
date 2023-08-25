const MESSAGES = {
  USER: {
    GET: {
      pending: "",
      success: "",
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar o usuário.",
      },
      show: false,
    },
    POST: {
      pending: "Criando usuário...",
      success: "Usuário criado com sucesso!",
      error: {
        default: "Oops, não foi possível criar o usuário.",
      },
      show: true,
    },
    PATCH: {
      pending: "Atualizando usuário...",
      success: "Usuário atualizado com sucesso!",
      error: {
        default: "Oops, não foi possível atualizar o usuário.",
      },
      show: true,
    },
    DELETE: {
      pending: "Deletando usuário...",
      success: "Usuário deletado com sucesso!",
      error: {
        default: "Oops, não foi possível deletar o usuário.",
      },
      show: true,
    },
    PROFILE: {
      POST_PHOTO: {
        pending: "Atualizando foto de perfil...",
        success: "Foto de perfil atualizada com sucesso!",
        error: {
          default: "Oops, não foi possível atualizar a foto de perfil.",
        },
        show: true,
      },
      PATCH_CONTACTS: {
        pending: "Atualizando contatos...",
        success: "Contatos atualizados com sucesso!",
        error: {
          default: "Oops, não foi possível atualizar os contatos.",
        },
        show: true,
      },
      PATCH_PASSWORD: {
        pending: "Atualizando senha...",
        success: "Senha atualizada com sucesso!",
        error: {
          default: "Oops, não foi possível atualizar a senha.",
        },
        show: true,
      },
    },
  },
  AUTH: {
    LOGIN: {
      pending: "Autenticando usuário...",
      success: "Usuário autenticado com sucesso!",
      error: {
        400: "Requisição inválida.",
        401: "Não autorizado, verifique as informações fornecidas.",
        403: "Acesso proibido.",
        404: "Usuário não encontrado.",
        405: "Método não permitido.",
        408: "Tempo de requisição esgotado.",
        429: "Muitas requisições.",
        500: "Erro interno do servidor.",
        502: "Gateway inválido.",
        503: "Serviço indisponível.",
        504: "Tempo de gateway esgotado.",
        default: "Oops, não foi possível autenticar o usuário.",
      },
      show: true,
    },
  },
};

export default MESSAGES;
