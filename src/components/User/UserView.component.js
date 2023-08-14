import React from "react";
import {
  Typography,
  DialogContent,
  DialogTitle,
  Chip,
} from "@mui/material";

import { styles } from ".";

const UserView = ({ user }) => {
  return (
    <>
      <DialogTitle className={styles.userDialogTitle} paragraph>
        Visualizar Usuário
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" align="center">
          Nome
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          {user.name}
        </Typography>
        <Typography variant="subtitle1" align="center">
          Matricula
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          {user.registration}
        </Typography>
        <Typography variant="subtitle1" align="center">
          CPF
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          {user.cpf}
        </Typography>
        <Typography variant="subtitle1" align="center">
          E-mail
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          {user.email}
        </Typography>
        <Typography variant="subtitle1" align="center">
          Permissões
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          {user.permissions === "gestor"
            ? "Gestor"
            : user.permissions === "requisitante"
            ? "Requisitante"
            : ""}
        </Typography>
        <Typography variant="subtitle1" align="center">
          Status
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          paragraph
        >
          {user.active ? (
            <Chip label="Ativo" color="success" />
          ) : (
            <Chip label="Inativo" color="error" />
          )}
        </Typography>
      </DialogContent>
    </>
  );
};

export default UserView;
