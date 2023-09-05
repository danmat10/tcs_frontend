import React from "react";
import { TextField, Grid } from "@mui/material";

import { DialogForm } from "components/Common";

const DepartmentView = ({ department, onClose }) => {
  return (
    <DialogForm title="Visualizar Departamento" onClose={onClose}>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        <Grid item xs={12} md={6}>
          <TextField
            label="Nome do Departamento"
            value={department?.nmDepartamento || ""}
            variant="standard"
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Responsável do Departamento"
            value={department?.usuario?.nmUsuario || ""}
            variant="standard"
            disabled
            fullWidth
          />
        </Grid>
      </Grid>
    </DialogForm>
  );
};

export { DepartmentView };
