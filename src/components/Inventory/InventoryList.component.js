import React from "react";
import { Grid, Button } from "@mui/material";
import { Check, Visibility } from "@mui/icons-material";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { styles } from ".";

const InventoryList = ({ inventories, openDialog }) => {
  const columns = getColumns();

  function getColumns() {
    const baseColumns = [
      {
        field: "id",
        headerName: "ID",
        flex: 1,
      },
      {
        field: "dtAgendada",
        headerName: "Data Prevista",
        flex: 1,
        renderCell: (params) => params.row.dtAgendada,
      },
      {
        field: "dtRealizada",
        headerName: "Data Realizada",
        flex: 1,
        renderCell: (params) => params.row.dtRealizada,
      },
      {
        field: "actions",
        headerName: "Ações",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <>
            <Visibility
              color="primary"
              onClick={() => {
                openDialog("view", params.row);
              }}
              style={{ cursor: "pointer" }}
              titleAccess="Visualizar"
            />
            <Check
              color="primary"
              onClick={() => openDialog("end", params.row)}
              style={{ cursor: "pointer" }}
              titleAccess="Finalizar"
            />
          </>
        ),
      },
    ];
    return baseColumns;
  }

  return (
    <Grid container spacing={3} padding={2}>
      <Grid item xs={12} md={12} className={styles.buttonGrid}>
        <Button
          variant="contained"
          onClick={() => openDialog("create")}
          className={styles.buttonCadastrar}
        >
          Cadastrar
        </Button>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid item xs={12} md={12} lg={12}>
          <DataGrid
            sx={{ height: 500 }}
            rows={inventories}
            columns={columns}
            autoPageSize
            pageSizeOptions={[10]}
            checkboxSelection={false}
            disableSelectionOnClick
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export { InventoryList };
