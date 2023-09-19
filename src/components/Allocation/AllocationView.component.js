import React from "react";
import {
  TextField,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import {
  DialogForm,
  formatBackendDateToField,
  maskCurrencyFunction,
} from "components/Common";
import { PatrimonyStatusChip } from "components/Patrimony";

const AllocationView = ({ allocation, onClose }) => {
  return (
    <DialogForm title="Visualizar Alocação" onClose={onClose}>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Departamento de Destino"
            name="departament.nmDepartamento"
            type="text"
            value={allocation.departament.nmDepartamento || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Data de Alocação"
            name="dtAlocacao"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formatBackendDateToField(allocation.dtAlocacao)}
            variant="standard"
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            fullWidth
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            label="Observação"
            name="observation"
            type="text"
            value={allocation.observation || ""}
            variant="standard"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Patrimônios</Typography>
        </Grid>
        <Grid item md={12} xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Valor de Aquisição</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allocation.patrimonies.map((patrimony) => (
                <TableRow key={patrimony.id}>
                  <TableCell>{patrimony.id}</TableCell>
                  <TableCell>{patrimony.nmPatrimonio}</TableCell>
                  <TableCell>
                    {maskCurrencyFunction(String(patrimony.vlAquisicao * 100))}
                  </TableCell>
                  <TableCell>
                    <PatrimonyStatusChip patrimony={patrimony} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </DialogForm>
  );
};

export { AllocationView };
