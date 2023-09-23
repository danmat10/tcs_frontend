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
          502: "Senha informada inválida!",
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
  DEPARTMENT: {
    GET: {
      pending: "",
      success: "",
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar o departamento.",
      },
      show: false,
    },
    POST: {
      pending: "Criando departamento...",
      success: "Departamento criado com sucesso!",
      error: {
        default: "Oops, não foi possível criar o departamento.",
      },
      show: true,
    },
    PATCH: {
      pending: "Atualizando departamento...",
      success: "Departamento atualizado com sucesso!",
      error: {
        default: "Oops, não foi possível atualizar o departamento.",
      },
      show: true,
    },
    DELETE: {
      pending: "Deletando departamento...",
      success: "Departamento deletado com sucesso!",
      error: {
        default: "Oops, não foi possível deletar o departamento.",
      },
      show: true,
    },
  },
  CONSTRUCTION: {
    GET: {
      pending: "",
      success: "",
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar a obra.",
      },
      show: false,
    },
    POST: {
      pending: "Criando obra...",
      success: "Obra criada com sucesso!",
      error: {
        default: "Oops, não foi possível criar a obra.",
      },
      show: true,
    },
    PUT: {
      pending: "Atualizando obra...",
      success: "Obra atualizada com sucesso!",
      error: {
        default: "Oops, não foi possível atualizar a obra.",
      },
      show: true,
    },
    DELETE: {
      pending: "Deletando obra...",
      success: "obra deletada com sucesso!",
      error: {
        default: "Oops, não foi possível deletar a obra.",
      },
      show: true,
    },
  },
  PATRIMONY: {
    GET: {
      pending: "",
      success: "",
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar o patrimônio.",
      },
      show: false,
    },
    POST: {
      pending: "Criando patrimônio...",
      success: "Patrimônio criado com sucesso!",
      error: {
        default: "Oops, não foi possível criar o patrimônio.",
      },
      show: true,
    },
    PUT: {
      pending: "Atualizando patrimônio...",
      success: "Patrimônio atualizado com sucesso!",
      error: {
        default: "Oops, não foi possível atualizar o patrimônio.",
      },
      show: true,
    },
    SEARCH: {
      pending: "Buscando patrimônio...",
      success: {
        render: ({ data }) => {
          return data?.length + " patrimônio(s) localizado(s).";
        },
      },
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar o patrimônio.",
        404: "Nenhum patrimônio encontrado.",
      },
      show: true,
    },
    GET_ID: {
      pending: "Buscando patrimônio...",
      success: "QR Code lido com sucesso!",
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar o patrimônio.",
        404: "Nenhum patrimônio encontrado.",
      },
      show: true,
    },
  },
  MAINTENCE: {
    GET: {
      pending: "",
      success: "",
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar a manutenção.",
      },
      show: false,
    },
    POST: {
      pending: "Criando manutenção...",
      success: "Manutenção criada com sucesso!",
      error: {
        default: "Oops, não foi possível criar a manutenção.",
      },
      show: true,
    },
    PUT: {
      pending: "Atualizando manutenção...",
      success: "Manutenção atualizada com sucesso!",
      error: {
        default: "Oops, não foi possível atualizar a manutenção.",
      },
      show: true,
    },
  },
  ALLOCATION: {
    GET: {
      pending: "",
      success: "",
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar a alocação.",
      },
      show: false,
    },
    POST: {
      pending: "Criando alocação...",
      success: "Alocação criada com sucesso!",
      error: {
        default: "Oops, não foi possível criar a alocação.",
      },
      show: true,
    },
  },
};

export { MESSAGES };
