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
            name="department.nmDepartamento"
            type="text"
            value={allocation.department.nmDepartamento || ""}
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
            value={formatBackendDateToField(allocation.patrimonies[0]?.dtAlocacao)}
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
                  <TableCell>{patrimony.patrimonio.nmPatrimonio}</TableCell>
                  <TableCell>
                    {maskCurrencyFunction(String(patrimony.patrimonio.vlAquisicao * 100))}
                  </TableCell>
                  <TableCell>
                    <PatrimonyStatusChip patrimony={patrimony.patrimonio} />
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
