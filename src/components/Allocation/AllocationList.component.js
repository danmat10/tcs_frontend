import React, { useState } from "react";
import { Grid, TextField, Button, FormHelperText } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { styles } from ".";
import { PageGridContent } from "components/Common";

const AllocationList = ({ allocations, openDialog }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [search, setSearch] = useState("");
  const columns = getColumns(isMobile);

  function getColumns(isMobile) {
    const baseColumns = [
      {
        field: "id",
        headerName: "Código",
        flex: 1,
      },
      {
        field: "departament",
        headerName: "Departamento de Destino",
        flex: 2,
        renderCell: (params) => params.row.department?.nmDepartamento,
      },
      {
        field: "dtAlocacao",
        headerName: "Data de Alocação",
        flex: 2,
        renderCell: (params) => params.row.patrimonies[0]?.dtAlocacao,
      },
      {
        field: "nPatrimonies",
        headerName: "Quantidade",
        flex: 1,
        renderCell: (params) => params.row.patrimonies.length,
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
          </>
        ),
      },
    ];
    if (isMobile) {
      return baseColumns
        .filter(
          (column) =>
            column.field === "departament" || column.field === "actions"
        )
        .map((column) => {
          if (column.field === "departament") {
            return { ...column, flex: 1 };
          } else if (column.field === "actions") {
            return { ...column, flex: 1 };
          }
          return column;
        });
    }
    return baseColumns;
  }
  function matchesSearch(row) {
    return [row.department?.nmDepartamento].some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    );
  }

  const filteredRows = allocations.filter((row) => {
    return matchesSearch(row);
  });

  return (
    <PageGridContent>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormHelperText>Pesquisar por departamento, usuário...</FormHelperText>
      </Grid>
      <Grid item xs={12} md={9} className={styles.buttonGrid}>
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
            rows={filteredRows}
            columns={columns}
            autoPageSize
            pageSizeOptions={[10]}
            checkboxSelection={false}
            disableSelectionOnClick
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Grid>
      </Grid>
    </PageGridContent>
  );
};

export { AllocationList };
