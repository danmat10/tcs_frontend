import React, { useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Autocomplete,
} from "@mui/material";
import { styles } from ".";
import { handleCreateReport, handleGetConstructionList } from "services";
import { useAuthHeader } from "react-auth-kit";
import {
  formatBackendDateToField,
  formatFieldToDate,
  maskCurrencyFunction,
  unmaskCurrencyFunction,
} from "components/Common";
import { validateReportForm } from "validations";

const ManagementReports = () => {
  const [state, setState] = React.useState({
    reportType: "",
    fileType: "",
    report: null,
    view: "",
    constructions: [],
    selectedConstruction: null,
    errors: {
      reportTypeError: false,
      fileTypeError: false,
      losses: {
        dtStart: false,
        dtStartErrorText: "",
        dtEnd: false,
        dtEndErrorText: "",
      },
      maintenceExpenses: {
        dtStart: false,
        dtStartErrorText: "",
        dtEnd: false,
        dtEndErrorText: "",
        vlMin: false,
        vlMinErrorText: "",
        vlMax: false,
        vlMaxErrorText: "",
      },
    },
    reportsConfig: {
      general: {
        nmRelatory: "Patrimônio Disponiveis",
        fixo: {
          value: null,
          label: "Todos",
        },
      },
      qrCode: {
        nmRelatory: "Gerar Qr Code Patrimônio",
      },
      losses: {
        nmRelatory: "Bens Baixados",
        dtStart: "",
        dtEnd: "",
      },
      inventory: {
        nmRelatory: "Períodos de Inventário",
      },
      onLoan: {
        nmRelatory: "Patrimônios em obras",
      },
      overdue: {
        nmRelatory: "Devoluções Vencidas",
      },
      traceability: {
        nmRelatory: "Rastreabilidade do Patrimônio",
      },
      maintenceExpenses: {
        nmRelatory: "Gastos com Manutenção",
        dtStart: "",
        dtEnd: "",
        vlMin: 0,
        vlMax: 0,
      },
    },
  });
  const authHeader = useAuthHeader();

  useEffect(() => {
    handleGetConstructionList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
  }, []);

  const view = {
    general: (
      <>
        <Grid item xs={12} md={6}>
          <Autocomplete
            fullWidth
            options={[
              { value: true, label: "Fixo" },
              { value: false, label: "Requisitável" },
              { value: null, label: "Todos" },
            ]}
            value={state.reportsConfig.general.fixo}
            onChange={(event, newValue) => {
              setState({
                ...state,
                reportsConfig: {
                  ...state.reportsConfig,
                  general: {
                    ...state.reportsConfig.general,
                    fixo: newValue,
                  },
                },
              });
            }}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField {...params} label="Tipo de patrimônio" />
            )}
          />
        </Grid>
      </>
    ),
    losses: (
      <>
        <Grid item xs={12} md={6}>
          <TextField
            label="Data Inicial"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={formatBackendDateToField(state.reportsConfig.losses.dtStart)}
            onChange={(e) => {
              setState({
                ...state,
                reportsConfig: {
                  ...state.reportsConfig,
                  losses: {
                    ...state.reportsConfig.losses,
                    dtStart: formatFieldToDate(e.target.value),
                  },
                },
              });
            }}
            error={state.errors.losses.dtStart}
            helperText={
              state.errors.losses.dtStart &&
              state.errors.losses.dtStartErrorText
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Data Final"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={formatBackendDateToField(state.reportsConfig.losses.dtEnd)}
            onChange={(e) => {
              setState({
                ...state,
                reportsConfig: {
                  ...state.reportsConfig,
                  losses: {
                    ...state.reportsConfig.losses,
                    dtEnd: formatFieldToDate(e.target.value),
                  },
                },
              });
            }}
            error={state.errors.losses.dtEnd}
            helperText={
              state.errors.losses.dtEnd && state.errors.losses.dtEndErrorText
            }
          />
        </Grid>
      </>
    ),
    inventory: null,
    onLoan: (
      <Grid item md={6} xs={12}>
        <Autocomplete
          fullWidth
          options={state.constructions}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.id + " - " + option.nmObra}
          value={state.selectedConstruction}
          onChange={(event, newValue) => {
            setState({ ...state, selectedConstruction: newValue });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Obra de Destino" />
          )}
        />
      </Grid>
    ),
    overdue: null,
    // traceability: null,
    qrCode: null,
    maintenceExpenses: (
      <>
        <Grid item xs={12} md={6}>
          <TextField
            label="Data Inicial"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={formatBackendDateToField(
              state.reportsConfig.maintenceExpenses.dtStart
            )}
            onChange={(e) => {
              setState({
                ...state,
                reportsConfig: {
                  ...state.reportsConfig,
                  maintenceExpenses: {
                    ...state.reportsConfig.maintenceExpenses,
                    dtStart: formatFieldToDate(e.target.value),
                  },
                },
              });
            }}
            error={state.errors.maintenceExpenses.dtStart}
            helperText={
              state.errors.maintenceExpenses.dtStart &&
              state.errors.maintenceExpenses.dtStartErrorText
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Data Final"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={formatBackendDateToField(
              state.reportsConfig.maintenceExpenses.dtEnd
            )}
            onChange={(e) => {
              setState({
                ...state,
                reportsConfig: {
                  ...state.reportsConfig,
                  maintenceExpenses: {
                    ...state.reportsConfig.maintenceExpenses,
                    dtEnd: formatFieldToDate(e.target.value),
                  },
                },
              });
            }}
            error={state.errors.maintenceExpenses.dtEnd}
            helperText={
              state.errors.maintenceExpenses.dtEnd &&
              state.errors.maintenceExpenses.dtEndErrorText
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={"Valor Mínimo"}
            type="text"
            onChange={(e) => {
              const value = unmaskCurrencyFunction(e.target.value);
              setState({
                ...state,
                reportsConfig: {
                  ...state.reportsConfig,
                  maintenceExpenses: {
                    ...state.reportsConfig.maintenceExpenses,
                    vlMin: value,
                  },
                },
              });
            }}
            value={maskCurrencyFunction(
              state.reportsConfig.maintenceExpenses.vlMin
            )}
            error={state.errors.maintenceExpenses.vlMin}
            helperText={
              state.errors.maintenceExpenses.vlMin &&
              state.errors.maintenceExpenses.vlMinErrorText
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={"Valor Máximo"}
            type="text"
            onChange={(e) => {
              const value = unmaskCurrencyFunction(e.target.value);
              setState({
                ...state,
                reportsConfig: {
                  ...state.reportsConfig,
                  maintenceExpenses: {
                    ...state.reportsConfig.maintenceExpenses,
                    vlMax: value,
                  },
                },
              });
            }}
            value={maskCurrencyFunction(
              state.reportsConfig.maintenceExpenses.vlMax
            )}
            error={state.errors.maintenceExpenses.vlMax}
            helperText={
              state.errors.maintenceExpenses.vlMax &&
              state.errors.maintenceExpenses.vlMaxErrorText
            }
          />
        </Grid>
      </>
    ),
  };

  const handleReportTypeChange = (event) => {
    setState({ ...state, reportType: event.target.value });
  };

  const handleFileTypeChange = (event) => {
    setState({ ...state, fileType: event.target.value });
  };

  const generateReport = () => {
    if (validateReportForm(state, setState)) {
      const data = {
        type: state.fileType,
        nmRelatory: state.reportsConfig[state.reportType].nmRelatory,
        dtStart: state.reportsConfig[state.reportType].dtStart || "",
        dtEnd: state.reportsConfig[state.reportType].dtEnd || "",
        fixo:
          state.reportsConfig[state.reportType].fixo?.value !== undefined
            ? state.reportsConfig[state.reportType].fixo.value
            : null,
        vlMin: state.reportsConfig[state.reportType].vlMin || 0,
        vlMax: state.reportsConfig[state.reportType].vlMax || 0,
        nmPatrimony: "",
        nrSerie: "",
      };
      handleCreateReport({
        data: data,
        header: { Authorization: authHeader() },
        setState: setState,
      });
    }
  };

  return (
    <Paper
      elevation={3}
      style={{
        borderRadius: "28px",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
        }}
      >
        <Typography
          variant="h6"
          align="left"
          style={{ padding: "20px" }}
          className={styles.dialogTitle}
        >
          Gerar Relatório
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: {
            xs: "auto",
            md: "75%",
          },
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            padding: "30px",
          }}
        >
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Tipo de Relatório"
              value={state.reportType}
              onChange={handleReportTypeChange}
              fullWidth
              error={state.errors.reportTypeError}
              helperText={
                state.errors.reportTypeError && "Selecione um tipo de relatório"
              }
            >
              <MenuItem value="losses">Baixas/Perdas</MenuItem>
              <MenuItem value="qrCode">
                Gerar Etiqueta de QR Code dos bens
              </MenuItem>
              <MenuItem value="general">Lista Geral de Patrimônios</MenuItem>
              {/* <MenuItem value="onLoan">Patrimônios em obras</MenuItem> */}
              <MenuItem value="overdue">
                Patrimônios com prazo de devolução vencido
              </MenuItem>
              {/* <MenuItem value="inventory">Períodos de Inventário</MenuItem> */}
              {/* <MenuItem value="traceability">
                Rastreabilidade do Patrimônio
              </MenuItem> */}
              <MenuItem value="maintenceExpenses">
                Gastos com Manutenção
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Tipo de Arquivo"
              value={state.fileType}
              onChange={handleFileTypeChange}
              fullWidth
              error={state.errors.fileTypeError}
              helperText={
                state.errors.fileTypeError && "Selecione um tipo de arquivo"
              }
            >
              <MenuItem value="PDF">PDF</MenuItem>
              <MenuItem value="EXCEL">Excel</MenuItem>
            </TextField>
          </Grid>
          {view[state.reportType]}
        </Grid>
      </Box>
      <Divider sx={{ marginBottom: 3 }} />
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={generateReport}
          sx={{
            marginRight: 3,
            marginBottom: 3,
          }}
        >
          GERAR
        </Button>
      </Box>
    </Paper>
  );
};
export { ManagementReports };
