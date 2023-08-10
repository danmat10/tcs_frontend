import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

const UserDelete = ({ user, onDelete, onClose }) => {
  return (
    <>
      <DialogTitle
        style={{ backgroundColor: "#e57373", color: "white" }}
        paragraph
      >
        Excluir Usuário
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você está prestes a excluir um usuário. Esta ação é irreversível e
          removerá todas as informações associadas a esse usuário.
        </DialogContentText>
        <Typography variant="subtitle1" component="p" style={{ marginTop: 16 }}>
          Você tem certeza que deseja excluir o usuário{" "}
          <strong>{user.name}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => onDelete(user)} color="secondary">
          Excluir
        </Button>
      </DialogActions>
    </>
  );
};

export default UserDelete;
