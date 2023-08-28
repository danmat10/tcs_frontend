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
