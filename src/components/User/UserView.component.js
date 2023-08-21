import React from "react";
import {
  DialogContent,
  DialogTitle,
  Chip,
  TextField,
  Grid,
  Divider,
  DialogActions,
  Button,
} from "@mui/material";

import { styles } from ".";

const UserView = ({ user, onClose }) => {
  return (
    <>
      <DialogTitle className={styles.userDialogTitle} paragraph>
        Visualizar Usuário
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} align="right">
            {user.active ? (
              <Chip label="Ativo" color="success" />
            ) : (
              <Chip label="Inativo" color="error" />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome"
              value={user.name}
              variant="standard"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Matricula"
              value={user.registration}
              variant="standard"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="CPF"
              value={user.cpf}
              variant="standard"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="E-mail"
              value={user.email}
              variant="standard"
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Permissões"
              value={
                user.permissions === "gestor"
                  ? "Gestor"
                  : user.permissions === "requisitante"
                    ? "Requisitante"
                    : user.permissions === "administrador"
                      ? "Administrador"
                      : ""
              }
              variant="standard"
              disabled
              fullWidth
            />
          </Grid>
          {user.contatos &&
            user.contatos.map((contato, index) => (
              <Grid item xs={12} md={6}>
                <TextField
                  label={user.contatos[index].tipo}
                  value={user.contatos[index].contato}
                  variant="standard"
                  disabled
                  fullWidth
                />
              </Grid>
            ))}
        </Grid>
        <Divider sx={{ marginTop: 5 }} />
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onClose()}
          >
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default UserView;
