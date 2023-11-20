import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormHelperText,
  useMediaQuery,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { PatrimonyQrReaderView, PatrimonyStatusChip, styles } from ".";
import { PageGridContent } from "components/Common";
import { DoNotDisturb, Edit, QrCode2, Visibility } from "@mui/icons-material";

const PatrimonyList = ({ patrimonies, openDialog }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [search, setSearch] = useState("");
  const columns = getColumns(isMobile);
  const [openQRScanner, setOpenQRScanner] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Todos");

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
        valueGetter: (params) => {
          return params.row.situacao;
        },
      },
      {
        field: "localizacao",
        headerName: "Localização",
        flex: 2,
        renderCell: (params) => {
          if (params.row.actualMaintenance) {
            return params.row.actualMaintenance.nmFornecedor + " - Manutenção";
          } else if (params.row.actualConstruction) {
            return params.row.actualConstruction.nmObra + " - Obra";
          } else if (params.row.actualDepartment) {
            return (
              params.row.actualDepartment.nmDepartamento + " - Departamento"
            );
          } else {
            return "Não Alocado";
          }
        },
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
            {params.row.situacao !== "Perda/Roubo" && (
              <DoNotDisturb
                color="primary"
                onClick={() => openDialog("drop", params.row)}
                style={{ cursor: "pointer" }}
                titleAccess="Baixar"
              />
            )}
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

  function matchesStatus(row) {
    const status = row.situacao;
    switch (statusFilter) {
      case "Alocado":
        return status === "Alocado";
      case "Disponivel":
        return status === "Disponivel";
      case "Em Manutenção":
        return status === "Em Manutenção";
      case "Perda/Roubo":
        return status === "Perda/Roubo";
      case "Registrado":
        return status === "Registrado";
      default:
        return true;
    }
  }

  const filteredRows = patrimonies.filter((row) => {
    const doesMatchSearch = matchesSearch(row);
    const doesMatchStatus = matchesStatus(row);
    return doesMatchSearch && doesMatchStatus;
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
      <Grid item xs={12} md={2}>
        <Select
          fullWidth
          variant="outlined"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="Alocado">Alocado</MenuItem>
          <MenuItem value="Disponivel">Disponível</MenuItem>
          <MenuItem value="Em Manutenção">Em Manutenção</MenuItem>
          <MenuItem value="Perda/Roubo">Perda/Roubo</MenuItem>
          <MenuItem value="Registrado">Registrado</MenuItem>
          <MenuItem value="Todos">Todos</MenuItem>
        </Select>
        <FormHelperText>Filtrar por status</FormHelperText>
      </Grid>
      <Grid item xs={12} md={3}>
        <Button
          component="label"
          variant="outlined"
          startIcon={<QrCode2 />}
          fullWidth
          onClick={() => setOpenQRScanner(true)}
        >
          Ler Qr Code
        </Button>
      </Grid>
      <Grid item xs={12} md={6} className={styles.buttonGrid}>
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
      <PatrimonyQrReaderView
        openDialog={openDialog}
        openQRScanner={openQRScanner}
        setOpenQRScanner={setOpenQRScanner}
      />
    </PageGridContent>
  );
};

export { PatrimonyList };
