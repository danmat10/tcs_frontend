import React from "react";
import { TextField, Grid, Typography } from "@mui/material";

import { DialogForm, maskCurrencyFunction } from "components/Common";

const PatrimonyView = ({ patrimony, onClose }) => {
  return (
    <DialogForm title="Visualizar Patrimônio" onClose={onClose}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            variant="standard"
            fullWidth
            label="Nome do Patrimônio"
            name="nmPatrimonio"
            type="text"
            value={patrimony.nmPatrimonio || ""}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            variant="standard"
            fullWidth
            label="Nº de Série"
            name="nmSerie"
            type="text"
            value={patrimony.nmSerie || ""}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            variant="standard"
            fullWidth
            label="Descrição"
            name="nmDescricao"
            type="text"
            multiline
            value={patrimony.nmDescricao || ""}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Fornecedor</Typography>
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            variant="standard"
            fullWidth
            label="CPF/CNPJ"
            name="nmCpf"
            type="text"
            value={patrimony.nmCpf || ""}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            variant="standard"
            fullWidth
            label="Nome do Fornecedor"
            name="nmFornecedor"
            type="text"
            value={patrimony.nmFornecedor || ""}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Nota Fiscal</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            variant="standard"
            fullWidth
            label="Nº da Nota Fiscal"
            name="nmNF"
            type="text"
            value={patrimony.nmNF || ""}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            variant="standard"
            fullWidth
            label="Data de Nota Fiscal"
            name="dtNf"
            type="date"
            value={patrimony.dtNf || ""}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            variant="standard"
            fullWidth
            label="Data de Aquisição"
            name="dtAquisicao"
            type="date"
            value={patrimony.dtAquisicao || ""}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            variant="standard"
            fullWidth
            label="Valor de Aquisição"
            name="vlAquisicao"
            type="text"
            value={maskCurrencyFunction(String(patrimony.vlAquisicao * 100))}
          />
        </Grid>
      </Grid>
    </DialogForm>
  );
};

export { PatrimonyView };
