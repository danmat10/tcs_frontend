import React, { useState } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Chip,
  Button,
  FormHelperText,
} from "@mui/material";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Edit, Visibility } from "@mui/icons-material";

import { styles } from ".";
import { PageGridContent } from "components/Common";

const UserList = ({ users, openDialog }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [search, setSearch] = useState("");
  const [situationFilter, setSituationFilter] = useState("Ativo");
  const columns = getColumns(isMobile);

  function getColumns(isMobile) {
    const baseColumns = [
      {
        field: "nmUsuario",
        headerName: "Nome",
        flex: 2,
      },
      {
        field: "nrMatricula",
        headerName: "Matrícula",
        flex: 2,
      },
      {
        field: "flStatus",
        headerName: "Situação",
        flex: 1,
        renderCell: (params) =>
          params.row.flStatus === "Ativo" ? (
            <Chip label="Ativo" color="success" />
          ) : (
            <Chip label="Inativo" color="error" />
          ),
      },
      {
        field: "typeUser",
        headerName: "Perfil",
        flex: 1,
        renderCell: (params) =>
          params.row.typeUser === "Admin"
            ? "Administrador"
            : params.row.typeUser,
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
              onClick={() => openDialog("view", params.row)}
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
          (column) => column.field === "nmUsuario" || column.field === "actions"
        )
        .map((column) => {
          if (column.field === "nmUsuario") {
            return { ...column, flex: 1 };
          } else if (column.field === "actions") {
            return { ...column, flex: 1 };
          }
          return column;
        });
    }
    return baseColumns;
  }

  function matchesSearch(user) {
    return [
      user.nmUsuario,
      user.email,
      user.nrCpf,
      user.nrMatricula,
      user.typeUser,
      user.flStatus,
    ].some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    );
  }

  const filteredUsers = users.filter((user) => {
    const doesMatchSearch = matchesSearch(user);

    switch (situationFilter) {
      case "Ativo":
        return doesMatchSearch && user.flStatus === "Ativo";
      case "Inativo":
        return doesMatchSearch && user.flStatus === "Inativo";
      case "Todos":
      default:
        return doesMatchSearch;
    }
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
        <FormHelperText>Pesquisar por nome, email...</FormHelperText>
      </Grid>
      <Grid item xs={12} md={2}>
        <Select
          fullWidth
          variant="outlined"
          value={situationFilter}
          onChange={(e) => setSituationFilter(e.target.value)}
        >
          <MenuItem value="Ativo">Ativo</MenuItem>
          <MenuItem value="Inativo">Inativo</MenuItem>
          <MenuItem value="Todos">Todos</MenuItem>
        </Select>
        <FormHelperText>Filtrar por situação</FormHelperText>
      </Grid>
      <Grid item xs={12} md={7} className={styles.buttonGrid}>
        <Button
          variant="contained"
          onClick={() => openDialog("create")}
          className={styles.buttonCadastrar}
        >
          Cadastrar
        </Button>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <DataGrid
          sx={{ height: 500 }}
          rows={filteredUsers}
          columns={columns}
          autoPageSize
          pageSizeOptions={[10]}
          checkboxSelection={false}
          disableSelectionOnClick
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Grid>
    </PageGridContent>
  );
};

export { UserList };
