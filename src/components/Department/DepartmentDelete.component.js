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

import { handleDeleteDepartment } from "services";

const DepartmentDelete = ({ department, onClose, setState }) => {
  const authHeader = useAuthHeader();

  const handleDelete = async () => {
    const response = await handleDeleteDepartment({
      id: department.id,
      header: { Authorization: authHeader() },
      setState: setState,
    });
    if (response) {
      onClose();
    }
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
        Excluir Departamento
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" component="p" style={{ marginTop: 16 }}>
          Você está prestes a excluir um departamento. Só poderá ser excluído um
          departamento que não possua nenhum histórico associado.
        </Typography>
        <Typography variant="subtitle1" component="p" style={{ marginTop: 16 }}>
          Você tem certeza que deseja excluir o departamento{" "}
          <strong>{department.nmDepartamento}</strong>?
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
          Excluir
        </Button>
      </DialogActions>
    </>
  );
};

export { DepartmentDelete };
