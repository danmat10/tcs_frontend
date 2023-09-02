import React from "react";
import { TextField, Grid, Typography } from "@mui/material";

import { DialogForm } from "components/Common";

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
            name="nmCpf"
            type="text"
            value={construction?.nmCpf || ""}
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
            name="endereco.nmCep"
            type="text"
            value={construction?.endereco?.nmCep || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Bairro"
            name="endereco.nmBairro"
            type="text"
            value={construction?.endereco?.nmBairro || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Logradouro"
            name="endereco.nmLogradouro"
            type="text"
            value={construction?.endereco?.nmLogradouro || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Número"
            name="endereco.nmNumero"
            type="text"
            value={construction?.endereco?.nmNumero || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Complemento"
            name="endereco.nmComplemento"
            type="text"
            value={construction?.endereco?.nmComplemento || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Cidade"
            name="endereco.nmCidade"
            type="text"
            value={construction?.endereco?.nmCidade || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Estado"
            name="endereco.nmEstado"
            type="text"
            value={construction?.endereco?.nmEstado || ""}
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
            value={construction?.dtInicio || ""}
            variant="standard"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            fullWidth
            label="Previsão de Finalização"
            name="dtPrevisaoFinalizacao"
            type="date"
            value={construction?.dtPrevisaoFinalizacao || ""}
            variant="standard"
          />
        </Grid>
        {construction?.dtFinalizacao && (
          <Grid item md={6} xs={12}>
            <TextField
              disabled
              fullWidth
              label="Data de Finalização"
              name="dtFinalizacao"
              type="date"
              value={construction?.dtFinalizacao || ""}
              variant="standard"
            />
          </Grid>
        )}
      </Grid>
    </DialogForm>
  );
};

export { ConstructionView };
