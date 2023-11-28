import { ErrorOutline } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { handleDeleteMaintence } from "services";

const MaintenceDelete = ({ maintence, onClose, setState }) => {
  const authHeader = useAuthHeader();

  const handleDelete = async () => {
    await handleDeleteMaintence({
      data: maintence,
      header: { Authorization: authHeader() },
      setState: setState,
    });
    onClose();
  };

  return (
    <>
      <DialogTitle
        style={{
          backgroundColor: "#C62828",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        paragraph
      >
        <ErrorOutline style={{ marginRight: 8 }} />
        Cancelar Manutenção
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" component="p" style={{ marginTop: 16 }}>
          Você está prestes a cancelar uma manutenção!
        </Typography>
        <Typography variant="subtitle1" component="p" style={{ marginTop: 16 }}>
          Você tem certeza que deseja prosseguir?
        </Typography>
      </DialogContent>
      <Divider sx={{ marginTop: 3 }} />
      <DialogActions
        sx={{
          padding: "16px 24px",
        }}
      >
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          style={{ marginRight: "15px" }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </>
  );
};

export { MaintenceDelete };
