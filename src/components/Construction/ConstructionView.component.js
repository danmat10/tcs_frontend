import React from "react";
import { TextField, Grid, Typography } from "@mui/material";

import { DialogForm, formatBackendDateToField } from "components/Common";

const ConstructionView = ({ construction, onClose }) => {
  return (
    <DialogForm title="Visualizar Obra" onClose={onClose}>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Nome da Obra"
            name="nmObra"
            type="text"
            value={construction.nmObra || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Responsável da Obra"
            name="nmResponsavel"
            type="text"
            value={construction?.usuario?.nmUsuario || ""}
            variant="standard"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Cliente</Typography>
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            fullWidth
            label="CPF/CNPJ"
            name="nrCnpjCpf"
            type="text"
            value={construction?.nrCnpjCpf || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Nome do Cliente"
            name="nmCliente"
            type="text"
            value={construction?.nmCliente || ""}
            variant="standard"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Endereço da Obra</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="CEP"
            name="nrCep"
            type="text"
            value={construction?.nrCep || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Bairro"
            name="nmBairro"
            type="text"
            value={construction?.nmBairro || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Logradouro"
            name="nmLogradouro"
            type="text"
            value={construction?.nmLogradouro || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Número"
            name="nrNumero"
            type="text"
            value={construction?.nrNumero || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Complemento"
            name="nmComplemento"
            type="text"
            value={construction?.nmComplemento || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Cidade"
            name="nmCidade"
            type="text"
            value={construction?.nmCidade || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Estado"
            name="nmUf"
            type="text"
            value={construction?.nmUf || ""}
            variant="standard"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Datas</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Data de Início"
            name="dtInicio"
            type="date"
            value={formatBackendDateToField(construction?.dtInicio)}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Previsão de Finalização"
            name="dtPrevisaoConclusao"
            type="date"
            value={formatBackendDateToField(construction?.dtPrevisaoConclusao)}
            variant="standard"
          />
        </Grid>
        {construction?.dtFim && (
          <Grid item md={6} xs={12}>
            <TextField
              disabled
              fullWidth
              label="Data de Finalização"
              name="dtFim"
              type="date"
              value={formatBackendDateToField(construction.dtFim)}
              variant="standard"
            />
          </Grid>
        )}
      </Grid>
    </DialogForm>
  );
};

export { ConstructionView };
