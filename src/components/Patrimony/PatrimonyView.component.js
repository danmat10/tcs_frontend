import React from "react";
import {
  TextField,
  Grid,
  Typography,
  Container,
  Chip,
  Box,
} from "@mui/material";

import {
  DialogForm,
  formatBackendDateToField,
  maskCurrencyFunction,
} from "components/Common";
import { PatrimonyStatusChip } from "./";

const PatrimonyView = ({ patrimony, onClose }) => {
  function isWarrantyExpired(dsWarranty) {
    const [day, month, year] = dsWarranty.split("/").map(Number);

    const warrantyDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
    return warrantyDate < currentDate;
  }

  return (
    <DialogForm title="Visualizar Patrimônio" onClose={onClose}>
      <Container>
        <Box display="flex" justifyContent="flex-end">
          <PatrimonyStatusChip patrimony={patrimony} />
        </Box>
        <Grid container spacing={8}>
          <Grid item md={6} xs={12}>
            <Grid container spacing={2} alignItems="center" marginTop="auto">
              <Grid item md={12} xs={12}>
                <Typography variant="subtitle1">Patrimônio</Typography>
              </Grid>
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
              <Grid item sm={6} xs={12}>
                <TextField
                  disabled
                  variant="standard"
                  fullWidth
                  label="Código do Patrimônio"
                  name="id"
                  type="text"
                  value={patrimony.id || ""}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  disabled
                  variant="standard"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label="Nº de Série"
                  name="nrSerie"
                  type="text"
                  value={patrimony.nrSerie || ""}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  disabled
                  variant="standard"
                  fullWidth
                  label="Descrição"
                  name="nmDescricao"
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  multiline
                  value={patrimony.nmDescricao || ""}
                />
              </Grid>
              {patrimony.warranties.length !== 0 && (
                <>
                  <Grid item md={12} xs={12}>
                    <Typography variant="subtitle1">Garantia</Typography>
                  </Grid>
                  {patrimony.warranties.map((row, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Tipo de Garantia"
                          value={row.tipoGarantia || ""}
                          variant="standard"
                          disabled
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={8} md={5}>
                        <TextField
                          label="Data da Garantia"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={formatBackendDateToField(row.dtValidade)}
                          variant="standard"
                          disabled
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4} md={3}>
                        {row.dtValidade && isWarrantyExpired(row.dtValidade) ? (
                          <Chip
                            label="Vencida"
                            color="error"
                            variant="filled"
                          />
                        ) : (
                          <Chip
                            label="Válida"
                            color="success"
                            variant="filled"
                          />
                        )}
                      </Grid>
                    </React.Fragment>
                  ))}
                </>
              )}
              {patrimony.situacao === "Perda/Roubo" && (
                <>
                  <Grid item md={12} xs={12}>
                    <Typography variant="subtitle1">
                      Detalhes da Baixa
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      disabled
                      variant="standard"
                      fullWidth
                      label="Data da Perda/Roubo"
                      name="dtLost"
                      type="date"
                      value={formatBackendDateToField(patrimony.dtLost)}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      disabled
                      variant="standard"
                      fullWidth
                      label="Observação"
                      name="observation"
                      type="text"
                      multiline
                      value={patrimony.observation || ""}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
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
                  name="nrCnpj"
                  type="text"
                  value={patrimony.nrCnpj || ""}
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
                  name="nrNF"
                  type="text"
                  value={patrimony.nrNF || ""}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  disabled
                  variant="standard"
                  fullWidth
                  label="Data de Nota Fiscal"
                  name="dtNF"
                  type="date"
                  value={formatBackendDateToField(patrimony.dtNF)}
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
                  value={formatBackendDateToField(patrimony.dtAquisicao)}
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
                  value={maskCurrencyFunction(patrimony.vlAquisicao || 0)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" marginTop="auto">
              {(patrimony.actualMaintenance && (
                <Grid item md={6} xs={12}>
                  <TextField
                    disabled
                    variant="standard"
                    fullWidth
                    label="Localização: Em Manutenção"
                    name="actualMaintenance"
                    type="text"
                    value={patrimony.actualMaintenance?.nmFornecedor || ""}
                  />
                </Grid>
              )) ||
                (patrimony.actualConstruction && (
                  <Grid item md={6} xs={12}>
                    <TextField
                      disabled
                      variant="standard"
                      fullWidth
                      label="Localização: Em Obra"
                      name="actualConstruction"
                      type="text"
                      value={
                        patrimony.actualConstruction?.nmObra ||
                        "Não Requisitado"
                      }
                    />
                  </Grid>
                )) ||
                (patrimony.actualDepartment && (
                  <Grid item md={6} xs={12}>
                    <TextField
                      disabled
                      variant="standard"
                      fullWidth
                      label="Localização: em Departamento"
                      name="actualDepartment"
                      type="text"
                      value={
                        patrimony.actualDepartment?.nmDepartamento ||
                        "Não Alocado"
                      }
                    />
                  </Grid>
                ))}
              <Grid item md={6} xs={12}>
                <TextField
                  disabled
                  variant="standard"
                  fullWidth
                  label="Tipo de Patrimônio"
                  name="fixo"
                  type="text"
                  value={patrimony.fixo ? "Fixo" : "Requisitável"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </DialogForm>
  );
};

export { PatrimonyView };
