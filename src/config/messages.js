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
    RESET_PASSWORD: {
      pending: "Solicitando e-mail de recuperação de senha...",
      success:
        "Solicitação de recuperação feita com sucesso! Verifique seu e-mail.",
      error: {
        default: "Oops, não foi possível redefinir a senha.",
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
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: false,
    },
    POST: {
      pending: "Criando departamento...",
      success: "Departamento criado com sucesso!",
      error: {
        default: "Oops, não foi possível criar o departamento.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    PATCH: {
      pending: "Atualizando departamento...",
      success: "Departamento atualizado com sucesso!",
      error: {
        default: "Oops, não foi possível atualizar o departamento.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    DELETE: {
      pending: "Deletando departamento...",
      success: "Departamento deletado com sucesso!",
      error: {
        default: "Oops, não foi possível deletar o departamento.",
        403: "Você não tem permissão para acessar este recurso.",
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
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: false,
    },
    POST: {
      pending: "Criando obra...",
      success: "Obra criada com sucesso!",
      error: {
        default: "Oops, não foi possível criar a obra.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    PUT: {
      pending: "Atualizando obra...",
      success: "Obra atualizada com sucesso!",
      error: {
        default: "Oops, não foi possível atualizar a obra.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    DELETE: {
      pending: "Deletando obra...",
      success: "obra deletada com sucesso!",
      error: {
        default: "Oops, não foi possível deletar a obra.",
        403: "Você não tem permissão para acessar este recurso.",
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
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: false,
    },
    POST: {
      pending: "Criando patrimônio...",
      success: "Patrimônio criado com sucesso!",
      error: {
        default: "Oops, não foi possível criar o patrimônio.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    PUT: {
      pending: "Atualizando patrimônio...",
      success: "Patrimônio atualizado com sucesso!",
      error: {
        default: "Oops, não foi possível atualizar o patrimônio.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    SEARCH: {
      pending: "Buscando patrimônio...",
      success: {
        render: ({ data }) => {
          return data.length + " patrimônio(s) localizado(s).";
        },
      },
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar o patrimônio.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    GET_ID: {
      pending: "Buscando patrimônio...",
      success: "1 patrimônio(s) localizado(s).",
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar o patrimônio.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    DROP: {
      pending: "Baixando patrimônio...",
      success: "Patrimônio baixado com sucesso!",
      error: {
        default: "Oops, não foi possível baixar o patrimônio.",
        403: "Você não tem permissão para acessar este recurso.",
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
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: false,
    },
    POST: {
      pending: "Criando manutenção...",
      success: "Manutenção criada com sucesso!",
      error: {
        default: "Oops, não foi possível criar a manutenção.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    PUT: {
      pending: "Atualizando manutenção...",
      success: "Manutenção atualizada com sucesso!",
      error: {
        default: "Oops, não foi possível atualizar a manutenção.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    START: {
      pending: "Iniciando manutenção...",
      success: "Patrimônio enviado para manutenção!",
      error: {
        default: "Oops, não foi possível iniciar a manutenção.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    END: {
      pending: "Finalizando manutenção...",
      success: "Manutenção finalizada com sucesso!",
      error: {
        default: "Oops, não foi possível finalizar a manutenção.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    DELETE: {
      pending: "Cancelando manutenção...",
      success: "Manutenção cancelada com sucesso!",
      error: {
        default: "Oops, não foi possível cancelar a manutenção.",
        403: "Você não tem permissão para acessar este recurso.",
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
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: false,
    },
    POST: {
      pending: "Criando alocação...",
      success: "Alocação criada com sucesso!",
      error: {
        default: "Oops, não foi possível criar a alocação.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
  },
  REQUISITION: {
    GET: {
      pending: "",
      success: "",
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar a requisição.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: false,
    },
    POST: {
      pending: "Criando requisição...",
      success: "Requisição criada com sucesso!",
      error: {
        default: "Oops, não foi possível criar a requisição.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    APPROVE: {
      pending: "Aprovando requisição...",
      success: "Requisição aprovada com sucesso!",
      error: {
        default: "Oops, não foi possível aprovar a requisição.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    REJECT: {
      pending: "Rejeitando requisição...",
      success: "Requisição rejeitada com sucesso!",
      error: {
        default: "Oops, não foi possível rejeitar a requisição.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    RETURN: {
      pending: "Devolvendo requisição...",
      success: "Requisição devolvida com sucesso!",
      error: {
        default: "Oops, não foi possível devolver a requisição.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
  },
  INVENTORY: {
    GET: {
      pending: "",
      success: "",
      error: {
        default: "Oops, ocorreu um erro desconhecido ao buscar o inventário.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: false,
    },
    POST: {
      pending: "Criando inventário...",
      success: "Inventário criado com sucesso!",
      error: {
        default: "Oops, não foi possível criar o inventário.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
    PUT: {
      pending: "Atualizando inventário...",
      success: "Inventário atualizado com sucesso!",
      error: {
        default: "Oops, não foi possível atualizar o inventário.",
        403: "Você não tem permissão para acessar este recurso.",
      },
      show: true,
    },
  },
  REPORT: {
    POST: {
      pending: "Criando relatório...",
      success: "Relatório criado com sucesso!",
      error: "Oops, não foi possível criar o relatório.",
      show: true,
    },
  },
  EMPTY_MESSAGE: {
    pending: "",
    success: "",
    error: {
      default: "",
    },
    show: false,
  },
};

export { MESSAGES };
