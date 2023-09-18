import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormHelperText,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { PatrimonyStatusChip, styles } from ".";
import { PageGridContent } from "components/Common";
import { Edit, Visibility } from "@mui/icons-material";

const PatrimonyList = ({ patrimonies, openDialog }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [search, setSearch] = useState("");
  const columns = getColumns(isMobile);

  function getColumns(isMobile) {
    const baseColumns = [
      {
        field: "nrSerie",
        headerName: "Número de Série",
        flex: 2,
      },
      {
        field: "nmPatrimonio",
        headerName: "Nome",
        flex: 2,
      },
      {
        field: "nmFornecedor",
        headerName: "Fornecedor",
        flex: 2,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
          return <PatrimonyStatusChip patrimony={params.row} />;
        },
      },
      {
        field: "nmDepartamento",
        headerName: "Departamento Atual",
        flex: 2,
        renderCell: (params) =>
          params.row.actualDepartment
            ? params.row.actualDepartment.nmDepartamento
            : "Não Alocado",
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
          (column) =>
            column.field === "nmPatrimonio" || column.field === "actions"
        )
        .map((column) => {
          if (column.field === "nmPatrimonio") {
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
    return [row.nmPatrimonio, row.nmFornecedor].some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    );
  }
  const filteredRows = patrimonies.filter((patrimony) => {
    return matchesSearch(patrimony);
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
        <FormHelperText>Pesquisar por nome, fornecedor...</FormHelperText>
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

export { PatrimonyList };
