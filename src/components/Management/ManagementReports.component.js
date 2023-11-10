import React from "react";
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
import { toast } from "react-toastify";

const ManagementReports = () => {
  const [state, setState] = React.useState({
    reportType: "",
    fileType: "",
    view: "",
  });

  const view = {
    general: (
      <>
        <Grid item xs={12} md={6}>
          <TextField
            label="Data Inicial"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
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
          />
        </Grid>
      </>
    ),

    losses: null,
    onLoan: null,
    overdue: null,
  };

  const handleReportTypeChange = (event) => {
    setState({ ...state, reportType: event.target.value });
  };

  const handleFileTypeChange = (event) => {
    setState({ ...state, fileType: event.target.value });
  };

  const generateReport = () => {
    toast.info("Em desenvolvimento");
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
          height: "75%",
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
            >
              <MenuItem value="general">Lista Geral de Patrimônios</MenuItem>
              <MenuItem value="losses">Baixas/Perdas</MenuItem>
              <MenuItem value="onLoan">Patrimônios em obras</MenuItem>
              <MenuItem value="overdue">
                Patrimônios com prazo de devolução vencido
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
            >
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="excel">Excel</MenuItem>
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
