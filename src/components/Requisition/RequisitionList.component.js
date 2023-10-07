import React, { useState } from "react";
import { Grid, TextField, Button, FormHelperText } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { styles } from ".";
import { PageGridContent } from "components/Common";

const RequisitionList = ({ requisitions, openDialog }) => {
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
        field: "construction",
        headerName: "Obra de Destino",
        flex: 2,
        renderCell: (params) => params.row.construction?.nmObra,
      },
      {
        field: "dtRequisicao",
        headerName: "Data de Requisição",
        flex: 2,
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
            column.field === "construction" || column.field === "actions"
        )
        .map((column) => {
          if (column.field === "construction") {
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
    return [row.construction?.nmObra].some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    );
  }

  const filteredRows = requisitions.filter((row) => {
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
        <FormHelperText>Pesquisar por obra...</FormHelperText>
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

export { RequisitionList };