import React from "react";
import {
  Typography,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const UserView = ({ user }) => {
  return (
    <>
      <DialogTitle
        style={{ backgroundColor: "#0d6efd", color: "white" }}
        paragraph
      >
        Visualizar Usuário
      </DialogTitle>

      <DialogContent>
        <DialogContentText marginBottom={2}>
          Você está visualizando os detalhes do usuário. Aqui estão todas as
          informações associadas a esse usuário.
        </DialogContentText>

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
      </DialogContent>
    </>
  );
};

export default UserView;
