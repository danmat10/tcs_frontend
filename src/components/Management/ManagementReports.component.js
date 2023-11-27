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
} from "@mui/material";
import { styles } from ".";
import {
  handleCreateReport,
  handleGetConstructionList,
  handleGetDepartmentsList,
} from "services";
import { useAuthHeader } from "react-auth-kit";
import { validateReportForm } from "validations";
import {
  ReportMaintenceExpenses,
  ReportMaintenceSchedule,
  ReportPatrimonyAvailable,
  ReportPatrimonyByLoan,
  ReportPatrimonyGeneralView,
  ReportPatrimonyLossesView,
  ReportPatrimonyOnDepartment,
  ReportPatrimonyOnLoan,
  ReportRequestPending,
} from "components/Report";

const ManagementReports = () => {
  const [state, setState] = React.useState({
    reportType: "",
    fileType: "",
    report: null,
    view: "",
    departments: [],
    selectedDepartment: null,
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
      maintenceSchedule: {
        dtStart: false,
        dtStartErrorText: "",
        dtEnd: false,
        dtEndErrorText: "",
      },
      pending: {
        dtStart: false,
        dtStartErrorText: "",
        dtEnd: false,
        dtEndErrorText: "",
      },
      onLoan: {
        dtStart: false,
        dtStartErrorText: "",
        dtEnd: false,
        dtEndErrorText: "",
      },
      byLoan: {
        dtStart: false,
        dtStartErrorText: "",
        dtEnd: false,
        dtEndErrorText: "",
      },
      onDepartment: {
        dtStart: false,
        dtStartErrorText: "",
        dtEnd: false,
        dtEndErrorText: "",
      },
    },
    reportsConfig: {
      general: {
        nmRelatory: "Geral Patrimônio",
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
      overdue: {
        nmRelatory: "Devoluções Vencidas",
      },
      pending: {
        nmRelatory: "Requisições Pendentes",
        dtStart: "",
        dtEnd: "",
      },
      maintenceExpenses: {
        nmRelatory: "Gastos com Manutenção",
        dtStart: "",
        dtEnd: "",
        vlMin: 0,
        vlMax: 0,
      },
      inventory: {
        nmRelatory: "Geral Inventário",
      },
      maintenceSchedule: {
        nmRelatory: "Manutenções Agendadas",
        dtStart: "",
        dtEnd: "",
      },
      available: {
        nmRelatory: "Patrimônio Disponiveis",
        fixo: {
          value: null,
          label: "Todos",
        },
      },
      onLoan: {
        nmRelatory: "Patrimônios Por Obras",
        dtStart: "",
        dtEnd: "",
      },
      byLoan: {
        nmRelatory: "Patrimônios Nas Obras",
        dtStart: "",
        dtEnd: "",
      },
      onDepartment: {
        nmRelatory: "Patrimônios Nos Departamentos",
        dtStart: "",
        dtEnd: "",
      },
    },
  });
  const authHeader = useAuthHeader();

  useEffect(() => {
    handleGetConstructionList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
    handleGetDepartmentsList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
  }, []);

  const view = {
    general: <ReportPatrimonyGeneralView state={state} setState={setState} />,
    losses: <ReportPatrimonyLossesView state={state} setState={setState} />,
    inventory: null,
    available: <ReportPatrimonyAvailable state={state} setState={setState} />,
    pending: <ReportRequestPending state={state} setState={setState} />,
    onDepartment: (
      <ReportPatrimonyOnDepartment state={state} setState={setState} />
    ),
    onLoan: <ReportPatrimonyOnLoan state={state} setState={setState} />,
    byLoan: <ReportPatrimonyByLoan state={state} setState={setState} />,
    overdue: null,
    qrCode: null,
    maintenceSchedule: (
      <ReportMaintenceSchedule state={state} setState={setState} />
    ),
    maintenceExpenses: (
      <ReportMaintenceExpenses state={state} setState={setState} />
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
              <MenuItem value="inventory">Inventário</MenuItem>
              <MenuItem value="maintenceSchedule">
                Manutenções - Agendamentos
              </MenuItem>
              <MenuItem value="maintenceExpenses">
                Manutenções - Gastos
              </MenuItem>
              <MenuItem value="losses">Patrimônios - Baixas/Perdas</MenuItem>
              <MenuItem value="available">
                Patrimônios - Disponíveis para Requisição/Alocação
              </MenuItem>
              <MenuItem value="onLoan">Patrimônios - Em Obras</MenuItem>
              <MenuItem value="qrCode">
                Patrimônios - Etiqueta de QR Code
              </MenuItem>
              <MenuItem value="general">Patrimônios - Lista Geral</MenuItem>
              <MenuItem value="onDepartment">
                Patrimônios - Por Departamentos
              </MenuItem>
              <MenuItem value="byLoan">Patrimônios - Por Obras</MenuItem>
              <MenuItem value="overdue">
                Requisições - Prazo de Devolução Vencido
              </MenuItem>
              <MenuItem value="pending">Requisições - Pendentes</MenuItem>
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
