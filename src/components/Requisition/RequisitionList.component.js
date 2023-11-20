import React, { useState } from "react";
import { Grid, TextField, Button, FormHelperText } from "@mui/material";
import { Checklist, ContentPasteGo, Visibility } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { useIsGestor } from "routes";
import { RequisitionStatusChip, styles } from ".";
import { PageGridContent } from "components/Common";

const RequisitionList = ({ requisitions, openDialog }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [search, setSearch] = useState("");
  const columns = getColumns(isMobile);
  const isGestor = useIsGestor();

  function getColumns(isMobile) {
    const baseColumns = [
      {
        field: "id",
        headerName: "Código",
        flex: 1,
      },
      {
        field: "obra",
        headerName: "Obra de Destino",
        flex: 2,
        renderCell: (params) => params.row.obra?.nmObra,
      },
      {
        field: "dtPrevisaoRetirada",
        headerName: "Data Prevista de Retirada",
        flex: 2,
        renderCell: (params) => {
          return params.row.patrimonios[0].dtPrevisaoRetirada;
        },
      },
      {
        field: "dtPrevisaoDevolucao",
        headerName: "Data Prevista de Devolução",
        flex: 2,
        renderCell: (params) => {
          return params.row.patrimonios[0].dtPrevisaoDevolucao;
        },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 2,
        renderCell: (params) => {
          return <RequisitionStatusChip requisition={params.row} />;
        },
      },
      {
        field: "nPatrimonies",
        headerName: "Quantidade",
        flex: 1,
        renderCell: (params) => params.row.patrimonios.length,
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
            {isGestor && !params.row.patrimonios[0]?.dtRetirada && (
              <Checklist
                color="primary"
                onClick={() => {
                  openDialog("management", params.row);
                }}
                style={{ cursor: "pointer" }}
                titleAccess="Gerenciar"
              />
            )}
            {params.row.patrimonios[0]?.dtRetirada &&
              !params.row.patrimonios[0]?.dtDevolucao && (
                <ContentPasteGo
                  color="primary"
                  onClick={() => {
                    openDialog("return", params.row);
                  }}
                  style={{ cursor: "pointer" }}
                  titleAccess="Devolver"
                />
              )}
          </>
        ),
      },
    ];
    if (isMobile) {
      return baseColumns
        .filter(
          (column) => column.field === "obra" || column.field === "actions"
        )
        .map((column) => {
          if (column.field === "obra") {
            return { ...column, flex: 3 };
          } else if (column.field === "actions") {
            return { ...column, flex: 2 };
          }
          return column;
        });
    }
    return baseColumns;
  }
  function matchesSearch(row) {
    return [row.obra?.nmObra].some(
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
