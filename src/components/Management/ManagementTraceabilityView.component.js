import React from "react";
import {
  Grid,
  Typography,
  Box,
  TextField,
  Container,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { PatrimonyStatusChip } from "components/Patrimony";
import {
  DialogForm,
  formatBackendDateToField,
  maskCurrencyFunction,
} from "components/Common";

const ManagementTraceabilityView = ({ onClose, state }) => {
  return (
    <DialogForm title="Visualizar Patrimônio" onClose={onClose}>
      {state.isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: {
              xs: "150px",
              md: "300px",
            },
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container>
          <Box display="flex" justifyContent="flex-end">
            <PatrimonyStatusChip patrimony={state.patrimonyHistoric} />
          </Box>
          <Grid container spacing={2} alignItems="center" marginTop="auto">
            <Grid item md={12} xs={12}>
              <TextField
                disabled
                variant="standard"
                fullWidth
                label="Nome do Patrimônio"
                name="nmPatrimonio"
                type="text"
                value={state.patrimonyHistoric.nmPatrimonio || ""}
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
                value={state.patrimonyHistoric.id || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                variant="standard"
                fullWidth
                label="Nº de Série"
                name="nrSerie"
                InputLabelProps={{ shrink: true }}
                type="text"
                value={state.patrimonyHistoric.nrSerie || ""}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                disabled
                variant="standard"
                fullWidth
                label="Descrição"
                InputLabelProps={{ shrink: true }}
                name="nmDescricao"
                type="text"
                multiline
                value={state.patrimonyHistoric.nmDescricao || ""}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                variant="standard"
                fullWidth
                label="Tipo de Patrimônio"
                name="fixo"
                type="text"
                value={state.patrimonyHistoric.fixo ? "Fixo" : "Alocável"}
              />
            </Grid>
            {state.patrimonyHistoric.warranties.length !== 0 && (
              <>
                <Grid item md={12} xs={12}>
                  <Typography variant="subtitle1">Garantia</Typography>
                </Grid>
                {state.patrimonyHistoric.warranties.map((row, index) => (
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
                  </React.Fragment>
                ))}
              </>
            )}
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
                name="nrCnpj"
                type="text"
                value={state.patrimonyHistoric.nrCnpj || ""}
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
                value={state.patrimonyHistoric.nmFornecedor || ""}
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
                value={state.patrimonyHistoric.nrNF || ""}
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
                value={formatBackendDateToField(state.patrimonyHistoric.dtNF)}
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
                value={formatBackendDateToField(
                  state.patrimonyHistoric.dtAquisicao
                )}
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
                value={maskCurrencyFunction(
                  state.patrimonyHistoric.vlAquisicao || 0
                )}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" marginTop="auto">
            {state.patrimonyHistoric.historylMaintenance.length !== 0 && (
              <>
                <Grid item md={12} xs={12}>
                  <Typography variant="subtitle1">
                    Histórico de manutenções
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Table aria-label="a dense table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Razão</TableCell>
                        <TableCell align="center">Tipo</TableCell>
                        <TableCell align="center">Situação</TableCell>
                        <TableCell align="center">Início</TableCell>
                        <TableCell align="center">Término</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.patrimonyHistoric.historylMaintenance.map(
                        (row) => (
                          <TableRow
                            key={row.reason}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.reason}
                            </TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.situation}</TableCell>
                            <TableCell align="right">{row.dtStart}</TableCell>
                            <TableCell align="right">{row.dtEnd}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </Grid>
              </>
            )}
            {state.patrimonyHistoric.historyDepartment.length !== 0 && (
              <>
                <Grid item md={12} xs={12}>
                  <Typography variant="subtitle1">
                    Histórico de alocações
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Table aria-label="a dense table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Departamento</TableCell>
                        <TableCell align="center">Responsável</TableCell>
                        <TableCell align="center">Início</TableCell>
                        <TableCell align="center">Término</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.patrimonyHistoric.historyDepartment.map(
                        (row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.nmDepartment}
                            </TableCell>
                            <TableCell align="right">
                              {row.nmResponsible}
                            </TableCell>
                            <TableCell align="right">{row.dtStart}</TableCell>
                            <TableCell align="right">{row.dtEnd}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </Grid>
              </>
            )}

            {state.patrimonyHistoric.historyConstruction.length !== 0 && (
              <>
                <Grid item md={12} xs={12}>
                  <Typography variant="subtitle1">
                    Histórico de requisições
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Table aria-label="a dense table" size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Obra</TableCell>
                        <TableCell align="center">Responsável</TableCell>
                        <TableCell align="center">Início</TableCell>
                        <TableCell align="center">Término</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.patrimonyHistoric.historyConstruction.map(
                        (row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.nmConstruction}
                            </TableCell>
                            <TableCell align="right">
                              {row.nmResponsible}
                            </TableCell>
                            <TableCell align="right">{row.dtStart}</TableCell>
                            <TableCell align="right">{row.dtEnd}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </Grid>
              </>
            )}
            {state.patrimonyHistoric.situacao === "Perda/Roubo" && (
              <>
                <Grid item md={12} xs={12}>
                  <Typography variant="subtitle1">
                    Histórico da Baixa
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    disabled
                    variant="standard"
                    fullWidth
                    label="Data da Perda/Roubo"
                    InputLabelProps={{ shrink: true }}
                    name="dtLost"
                    type="date"
                    value={formatBackendDateToField(
                      state.patrimonyHistoric.lossTheft.dtLost || ""
                    )}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    disabled
                    variant="standard"
                    fullWidth
                    label="Observação"
                    InputLabelProps={{ shrink: true }}
                    name="observation"
                    type="text"
                    multiline
                    value={state.patrimonyHistoric.lossTheft.observation || ""}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      )}
    </DialogForm>
  );
};
export { ManagementTraceabilityView };
