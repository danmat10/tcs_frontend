import React, { useState } from "react";
import { Grid, TextField, Button, FormHelperText } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { styles } from ".";
import { PageGridContent } from "components/Common";
import { Edit, Visibility } from "@mui/icons-material";

const ConstructionList = ({ openDialog, constructions }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [search, setSearch] = useState("");
  const columns = getColumns(isMobile);

  function getColumns(isMobile) {
    const baseColumns = [
      {
        field: "nmObra",
        headerName: "Nome",
        flex: 2,
      },
      {
        field: "usuario",
        headerName: "Responsável",
        flex: 1,
        renderCell: (params) =>
          params.row.usuario ? params.row.usuario.nmUsuario : "",
      },
      {
        field: "nmCliente",
        headerName: "Cliente",
        flex: 2,
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
            <Edit
              color="primary"
              onClick={() => openDialog("update", params.row)}
              style={{ cursor: "pointer" }}
              titleAccess="Editar"
            />
          </>
        ),
      },
    ];
    if (isMobile) {
      return baseColumns
        .filter(
          (column) => column.field === "nmObra" || column.field === "actions"
        )
        .map((column) => {
          if (column.field === "nmObra") {
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
    return [row.nmObra, row.usuario?.nmUsuario, row.nmCliente].some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    );
  }

  const filteredRows = constructions.filter((row) => {
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
        <FormHelperText>Pesquisar por nome, responsável...</FormHelperText>
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

export { ConstructionList };
