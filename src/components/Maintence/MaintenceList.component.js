import { Check, Edit, PlayCircle, Visibility } from "@mui/icons-material";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import {
  Grid,
  TextField,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

import { MaintenceStatusChip, getMaintenceStatus, styles } from ".";
import { PageGridContent } from "components/Common";

const MaintenceList = ({ openDialog, maintence }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const columns = getColumns(isMobile);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");

  function getColumns(isMobile) {
    const baseColumns = [
      {
        field: "nmPatrimonio",
        headerName: "Patrimonio",
        flex: 2,
        renderCell: (params) => {
          return params.row.patrimony.nmPatrimonio;
        },
      },
      {
        field: "nmTypeMaintence",
        headerName: "Tipo de Manutenção",
        flex: 2,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
          return <MaintenceStatusChip maintence={params.row} />;
        },
      },
      {
        field: "actions",
        headerName: "Ações",
        flex: 1,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          const status = getMaintenceStatus(params.row);
          return (
            <>
              <Visibility
                color="primary"
                onClick={() => {
                  openDialog("view", params.row);
                }}
                style={{ cursor: "pointer" }}
                titleAccess="Visualizar"
              />
              {status === "Prevista" || status === "Atrasada" ? (
                <>
                  <Edit
                    color="primary"
                    onClick={() => openDialog("update", params.row)}
                    style={{ cursor: "pointer" }}
                    titleAccess="Editar"
                  />
                  <PlayCircle
                    color="primary"
                    onClick={() => openDialog("start", params.row)}
                    style={{ cursor: "pointer" }}
                    titleAccess="Iniciar"
                  />
                </>
              ) : status === "Em andamento" ? (
                <Check
                  color="primary"
                  onClick={() => openDialog("end", params.row)}
                  style={{ cursor: "pointer" }}
                  titleAccess="Finalizar"
                />
              ) : null}
            </>
          );
        },
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
    return [row.patrimony.nmPatrimonio].some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    );
  }

  function matchesStatus(row) {
    const status = getMaintenceStatus(row);
    switch (statusFilter) {
      case "Concluída":
        return status === "Concluída";
      case "Em Andamento":
        return status === "Em andamento";
      case "Atrasada":
        return status === "Atrasada";
      case "Prevista":
        return status === "Prevista";
      case "Todos":
      default:
        return true;
    }
  }
  const filteredRows = maintence.filter((row) => {
    const doesMatchSearch = matchesSearch(row);
    const doesMatchStatus = matchesStatus(row);

    if (!doesMatchSearch || !doesMatchStatus) {
      return false;
    }

    switch (typeFilter) {
      case "Corretiva":
        return row.nmTypeMaintence === "Corretiva";
      case "Preventiva":
        return row.nmTypeMaintence === "Preventiva";
      case "Todos":
      default:
        return true;
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
        <FormHelperText>Pesquisar por patrimônio </FormHelperText>
      </Grid>
      <Grid item xs={12} md={2}>
        <Select
          fullWidth
          variant="outlined"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value="Corretiva">Corretiva</MenuItem>
          <MenuItem value="Preventiva">Preventiva</MenuItem>
        </Select>
        <FormHelperText>Filtrar por tipo</FormHelperText>
      </Grid>
      <Grid item xs={12} md={2}>
        <Select
          fullWidth
          variant="outlined"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value="Atrasada">Atrasada</MenuItem>
          <MenuItem value="Concluída">Concluída</MenuItem>
          <MenuItem value="Em Andamento">Em Andamento</MenuItem>
          <MenuItem value="Prevista">Prevista</MenuItem>
        </Select>
        <FormHelperText>Filtrar por status da manutenção</FormHelperText>
      </Grid>
      <Grid item xs={12} md={5} className={styles.buttonGrid}>
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
          rows={filteredRows}
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

export { MaintenceList };
