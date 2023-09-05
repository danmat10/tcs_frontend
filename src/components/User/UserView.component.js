import React from "react";
import { Chip, TextField, Grid } from "@mui/material";

import { DialogForm } from "components/Common";

const UserView = ({ user, onClose }) => {
  return (
    <DialogForm title="Visualizar Usuário" onClose={onClose}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} align="right">
          {user.flStatus === "Ativo" ? (
            <Chip label="Ativo" color="success" />
          ) : (
            <Chip label="Inativo" color="error" />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Nome"
            value={user.nmUsuario}
            variant="standard"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Matricula"
            value={user.nrMatricula}
            variant="standard"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="CPF"
            value={user.nrCpf}
            variant="standard"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Tipo de Usuário"
            value={user.typeUser}
            variant="standard"
            disabled
            fullWidth
          />
        </Grid>
        {user.contacts &&
          user.contacts.map((contact, index) => (
            <Grid item xs={12} md={6} key={index}>
              <TextField
                label={contact.typeContacts}
                value={contact.dsContato}
                variant="standard"
                disabled
                fullWidth
              />
            </Grid>
          ))}
      </Grid>
    </DialogForm>
  );
};

export { UserView };
