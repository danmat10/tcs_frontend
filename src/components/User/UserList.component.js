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
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import { styles } from ".";

const UserList = ({ users, openDialog }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [search, setSearch] = useState("");
  const [situationFilter, setSituationFilter] = useState("Todos");
  const columns = getColumns(isMobile);

  function getColumns(isMobile) {
    const baseColumns = [
      {
        field: "name",
        headerName: "Nome",
        flex: 2,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "email",
        headerName: "E-mail",
        flex: 2,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "active",
        headerName: "Situação",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) =>
          params.row.active ? (
            <Chip label="Ativo" color="success" />
          ) : (
            <Chip label="Inativo" color="error" />
          ),
      },
      {
        field: "permissions",
        headerName: "Perfil",
        flex: 1,
        align: "center",
        headerAlign: "center",
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
              onClick={() => openDialog("view", params.row)}
              style={{ cursor: "pointer" }}
              titleAccess="Visualizar"
            />
            <EditIcon
              color="primary"
              onClick={() => openDialog("update", params.row)}
              style={{ cursor: "pointer" }}
              titleAccess="Editar"
            />
            <DeleteIcon
              color="secondary"
              onClick={() => openDialog("delete", params.row)}
              style={{ cursor: "pointer" }}
              titleAccess="Excluir"
            />
          </>
        ),
      },
    ];

    if (isMobile) {
      return baseColumns
        .filter(
          (column) => column.field === "name" || column.field === "actions"
        )
        .map((column) => {
          if (column.field === "name") {
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
    return Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    );
  }

  const filteredUsers = users.filter((user) => {
    const doesMatchSearch = matchesSearch(user);

    switch (situationFilter) {
      case "Ativo":
        return doesMatchSearch && user.situation;
      case "Inativo":
        return doesMatchSearch && !user.situation;
      case "Todos":
      default:
        return doesMatchSearch;
    }
  });

  return (
    <Grid container spacing={3} className={styles.userListGrid}>
      <Grid item xs={12} md={4} lg={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormHelperText>Pesquisar por nome, email...</FormHelperText>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
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
      <Grid item xs={12} md={4} lg={4} className={styles.buttonGrid}>
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
    </Grid>
  );
};

export default UserList;
