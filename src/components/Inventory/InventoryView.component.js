import React from "react";
import { TextField, Grid } from "@mui/material";
import { DialogForm } from "components/Common";

const InventoryView = ({ inventory, onClose }) => {
  return (
    <DialogForm title="Visualizar Inventário" onClose={onClose}>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: 5,
          marginBottom: 10,
        }}
      >
        <Grid item xs={12} md={12}>
          <TextField
            label="Data de Previsão do Inventário"
            value={inventory?.dtAgendada || ""}
            variant="standard"
            disabled
            fullWidth
          />
        </Grid>
        {inventory?.dtRealizada && (
          <Grid item xs={12} md={12}>
            <TextField
              label="Data de Finalização do Inventário"
              value={inventory?.dtRealizada || ""}
              variant="standard"
              disabled
              fullWidth
            />
          </Grid>
        )}
      </Grid>
    </DialogForm>
  );
};

export { InventoryView };
