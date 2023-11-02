import React from "react";
import { TextField, Grid, Box } from "@mui/material";

import {
  DialogForm,
  formatBackendDateToField,
  maskCurrencyFunction,
} from "components/Common";
import { MaintenceStatusChip } from ".";

const MaintenceView = ({ maintence, onClose }) => {
  return (
    <DialogForm title="Visualizar Manutenção" onClose={onClose}>
      <Box display="flex" justifyContent="flex-end">
        <MaintenceStatusChip maintence={maintence} />
      </Box>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Patrimônio"
            name="patrimony"
            variant="standard"
            value={maintence?.patrimony?.nmPatrimonio || ""}
            disabled
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Tipo de manutenção"
            name="nmTypeMaintence"
            variant="standard"
            value={maintence?.nmTypeMaintence || ""}
            disabled
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            multiline
            variant="standard"
            label="Descrição da manutenção"
            name="dsMaintence"
            type="text"
            value={maintence?.dsMaintence || ""}
            disabled
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            variant="standard"
            label="Data de previsão"
            name="dtPrevisionMaintence"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formatBackendDateToField(
              maintence?.dtPrevisionMaintence || ""
            )}
            disabled
          />
        </Grid>
        {maintence?.dtStartMaintence && (
          <>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="CPF/CNPJ do fornecedor"
                name="nrCnpj"
                variant="standard"
                value={maintence?.nrCnpj || ""}
                disabled
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Nome do fornecedor"
                name="nmFornecedor"
                variant="standard"
                value={maintence?.nmFornecedor || ""}
                disabled
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Data de início"
                name="dtStartMaintence"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formatBackendDateToField(
                  maintence?.dtStartMaintence || ""
                )}
                disabled
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Observação"
                multiline
                name="observation"
                value={maintence?.observation || ""}
                disabled
              />
            </Grid>
          </>
        )}
        {maintence?.dtEndMaintence && (
          <>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Data de conclusão"
                name="dtEndMaintence"
                variant="standard"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formatBackendDateToField(
                  maintence?.dtEndMaintence || ""
                )}
                disabled
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                disabled
                variant="standard"
                fullWidth
                label="Valor da Manutenção"
                name="vlMaintence"
                type="text"
                value={maskCurrencyFunction(maintence?.vlMaintence || 0)}
              />
            </Grid>
          </>
        )}
      </Grid>
    </DialogForm>
  );
};

export { MaintenceView };
