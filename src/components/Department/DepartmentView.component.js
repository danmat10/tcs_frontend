import React from "react";
import {
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Divider,
  DialogActions,
  Button,
} from "@mui/material";

import { styles } from ".";

const DepartmentView = ({ department, onClose }) => {
  return (
    <>
      <DialogTitle className={styles.dialogTitle} paragraph>
        Visualizar Departamento
      </DialogTitle>
      <DialogContent>
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
        <Divider sx={{ marginTop: 5 }} />
        <DialogActions>
          <Button variant="contained" color="primary" onClick={() => onClose()}>
            OK
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
};

export default DepartmentView;
