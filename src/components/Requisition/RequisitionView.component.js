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

const RequisitionView = ({ requisition, onClose }) => {
  return (
    <DialogForm title="Visualizar Requisição" onClose={onClose}>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Obra de Destino"
            name="obra.nmObra"
            type="text"
            value={requisition.obra.nmObra || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Data de Previsão de Retirada"
            name="dtPrevisaoRetirada"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formatBackendDateToField(
              requisition.patrimonios[0]?.dtPrevisaoRetirada
            )}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Data de Retirada"
            name="dtRetirada"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formatBackendDateToField(
              requisition.patrimonios[0]?.dtRetirada
            )}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Data de Devolução"
            name="dtDevolucao"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formatBackendDateToField(
              requisition.patrimonios[0]?.dtDevolucao
            )}
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
              {requisition.patrimonios.map((patrimony) => (
                <TableRow key={patrimony.id}>
                  <TableCell>{patrimony.patrimonios.id}</TableCell>
                  <TableCell>{patrimony.patrimonios.nmPatrimonio}</TableCell>
                  <TableCell>
                    {maskCurrencyFunction(patrimony.patrimonios.vlAquisicao)}
                  </TableCell>
                  <TableCell>
                    <PatrimonyStatusChip patrimony={patrimony.patrimonios} />
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

export { RequisitionView };
