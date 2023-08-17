const MESSAGES = {
  USER: {
    GET: { pending: "", success: "", error: "", show: false },
    POST: {
      pending: "Criando usuário...",
      success: "Usuário criado com sucesso!",
      error: "Oops, não foi possível criar o usuário.",
      show: true,
    },
    PATCH: {
      pending: "Atualizando usuário...",
      success: "Usuário atualizado com sucesso!",
      error: "Oops, não foi possível atualizar o usuário.",
      show: true,
    },
    DELETE: {
      pending: "Deletando usuário...",
      success: "Usuário deletado com sucesso!",
      error: "Oops, não foi possível deletar o usuário.",
      show: true,
    },
    PROFILE: {
      POST_PHOTO: {
        pending: "Atualizando foto de perfil...",
        success: "Foto de perfil atualizada com sucesso!",
        error: "Oops, não foi possível atualizar a foto de perfil.",
        show: true,
      },
    },
  },
  AUTH: {
    LOGIN: {
      pending: "Autenticando usuário...",
      success: "Usuário autenticado com sucesso!",
      error: "Oops, não foi possível autenticar o usuário.",
      show: true,
    },
  },
};

export default MESSAGES;
