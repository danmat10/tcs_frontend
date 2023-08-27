import React, { useState } from "react";
import { Grid, TextField, Button, FormHelperText } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { styles } from ".";
import PageGridContent from "components/Common/PageGridContent.component";

const DepartmentList = ({ departments, openDialog }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [search, setSearch] = useState("");
  const columns = getColumns(isMobile);

  function getColumns(isMobile) {
    const baseColumns = [
      {
        field: "nmDepartamento",
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
        field: "actions",
        headerName: "Ações",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <>
            <ViewIcon
              color="primary"
              onClick={() => {
                openDialog("view", params.row);
              }}
              style={{ cursor: "pointer" }}
              titleAccess="Visualizar"
            />
            <EditIcon
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
            column.field === "nmDepartamento" || column.field === "actions"
        )
        .map((column) => {
          if (column.field === "nmDepartamento") {
            return { ...column, flex: 1 };
          } else if (column.field === "actions") {
            return { ...column, flex: 1 };
          }
          return column;
        });
    }
    return baseColumns;
  }

  function matchesSearch(department) {
    return [department.nmDepartamento, department.usuario?.nmUsuario].some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    );
  }

  const filteredDepartments = departments.filter((department) => {
    return matchesSearch(department);
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
            rows={filteredDepartments}
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

export default DepartmentList;
