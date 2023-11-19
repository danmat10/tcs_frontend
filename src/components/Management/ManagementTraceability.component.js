import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  useMediaQuery,
  Dialog,
} from "@mui/material";
import { ManagementTraceabilityView, styles } from ".";
import { PatrimonyStatusChip, PatriomonySearch } from "components/Patrimony";
import {
  handleGetPatrimoniesSearch,
  handleGetPatrimonyHistoric,
} from "services";
import { useState } from "react";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import { ManageSearch } from "@mui/icons-material";
import { useAuthHeader } from "react-auth-kit";

const ManagementTraceability = () => {
  const [state, setState] = React.useState({
    patrimonies: [],
    openDialog: false,
    isLoading: false,
    patrimonyHistoric: {},
  });

  const isMobile = useMediaQuery("(max-width:600px)");
  const [isLoading, setIsLoading] = useState(false);
  const columns = getColumns(isMobile);
  const authHeader = useAuthHeader();

  function getColumns(isMobile) {
    const baseColumns = [
      {
        field: "id",
        headerName: "Código",
        flex: 1,
      },
      {
        field: "nmPatrimonio",
        headerName: "Nome",
        flex: 4,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 2,
        renderCell: (params) => <PatrimonyStatusChip patrimony={params.row} />,
      },
      {
        field: "traceability",
        headerName: "Rastreabilidade",
        flex: 1,
        align: "center",
        renderCell: (params) => (
          <ManageSearch
            color="primary"
            onClick={() => openDialog(params.row)}
            style={{ cursor: "pointer" }}
            titleAccess="Rastrear Patrimônio"
          />
        ),
      },
    ];
    if (isMobile) {
      return baseColumns
        .filter(
          (column) =>
            column.field === "nmPatrimonio" || column.field === "traceability"
        )
        .map((column) => {
          return { ...column, flex: 2 };
        });
    }
    return baseColumns;
  }

  const openDialog = (patrimony) => {
    setState((prev) => ({ ...prev, openDialog: true, isLoading: true }));
    handleGetPatrimonyHistoric({
      setState,
      header: { Authorization: authHeader() },
      id: patrimony.id,
    });
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, openDialog: false }));
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
          height: "10%",
        }}
      >
        <Typography
          variant="h6"
          align="left"
          style={{ padding: "20px" }}
          className={styles.dialogTitle}
        >
          Rastreabilidade Patrimonial
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80%",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            padding: "30px",
          }}
        >
          <PatriomonySearch
            setState={setState}
            state={state}
            setIsLoading={setIsLoading}
            handleSearchPatrimonies={handleGetPatrimoniesSearch}
          />
          <Grid item md={12} xs={12}>
            <DataGrid
              loading={isLoading}
              density="compact"
              slots={isMobile ? {} : { toolbar: GridToolbar }}
              sx={{
                height: 300,
              }}
              rows={state.patrimonies}
              columns={columns}
              autoPageSize
              pageSizeOptions={[10]}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={state.openDialog}
        onClose={closeDialog}
        PaperProps={{ sx: { borderRadius: "28px" } }}
      >
        <ManagementTraceabilityView onClose={closeDialog} state={state} />
      </Dialog>
    </Paper>
  );
};
export { ManagementTraceability };
