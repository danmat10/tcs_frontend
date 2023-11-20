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
import { toast } from "react-toastify";
import { handleGetConstructionList } from "services";
import { useAuthHeader } from "react-auth-kit";

const ManagementReports = () => {
  const [state, setState] = React.useState({
    reportType: "",
    fileType: "",
    view: "",
    constructions: [],
    selectedConstruction: null,
    error: false,
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
            <TextField
              {...params}
              label="Obra de Destino"
              error={state.error}
              helperText={state.error && "Selecione uma obra"}
            />
          )}
        />
      </Grid>
    ),
    overdue: null,
    traceability: null,
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
              <MenuItem value="losses">Baixas/Perdas</MenuItem>
              <MenuItem value="general">Lista Geral de Patrimônios</MenuItem>
              <MenuItem value="onLoan">Patrimônios em obras</MenuItem>
              <MenuItem value="overdue">
                Patrimônios com prazo de devolução vencido
              </MenuItem>
              <MenuItem value="inventory">Períodos de Inventário</MenuItem>
              <MenuItem value="traceability">
                Rastreabilidade do Patrimônio
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
