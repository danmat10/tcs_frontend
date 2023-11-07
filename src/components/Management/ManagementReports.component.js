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

const ManagementReports = () => {
  const [reportType, setReportType] = React.useState("");
  const [fileType, setFileType] = React.useState("");

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const generateReport = () => {
    console.log("Gerando relatório...");
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
      fullWidth
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
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Tipo de Relatório"
              value={reportType}
              onChange={handleReportTypeChange}
              fullWidth
            >
              <MenuItem value="general">Lista Geral de Patrimônios</MenuItem>
              <MenuItem value="losses">Baixas/Perdas</MenuItem>
              <MenuItem value="on_loan">Patrimônios em obras</MenuItem>
              <MenuItem value="overdue">
                Patrimônios com prazo de devolução vencido
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Tipo de Arquivo"
              value={fileType}
              onChange={handleFileTypeChange}
              fullWidth
            >
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="excel">Excel</MenuItem>
            </TextField>
          </Grid>
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
