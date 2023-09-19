import {
  TextField,
  Grid,
  FormHelperText,
  Autocomplete,
  Chip,
  Container,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";

import { styles } from "components/Allocation";
import { handleGetPatrimoniesList } from "services";

const AllocationFormFields = ({ formik, state, setState }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isLoading, setIsLoading] = useState(false);
  const authHeader = useAuthHeader();
  const columns = getColumns(isMobile);

  useEffect(() => {
    handleGetPatrimoniesList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
  }, []);

  function getColumns(isMobile) {
    const baseColumns = [
      {
        field: "id",
        headerName: "Código",
        flex: 1,
      },
      {
        field: "nmPatrimonio",
        headerName: "Nome",
        flex: 4,
      },
      {
        field: "nmDepartamento",
        headerName: "Departamento Atual",
        flex: 4,
        renderCell: (params) => {
          if (params.row.actualDepartment === null) {
            return "Não Alocado";
          }
          return params.row.actualDepartment?.nmDepartamento;
        },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 2,
        renderCell: (params) => {
          if (params.row.fixo === "true") {
            return (
              <Chip
                label="Fixo"
                color="default"
                variant="filled"
                size="small"
              />
            );
          } else if (params.row.actualConstruction) {
            return (
              <Chip
                label="Em Obra"
                color="info"
                variant="filled"
                size="small"
              />
            );
          } else {
            return (
              <Chip
                label="Disponível"
                color="success"
                variant="filled"
                size="small"
              />
            );
          }
        },
      },
    ];
    if (isMobile) {
      return baseColumns
        .filter((column) => column.field === "nmPatrimonio")
        .map((column) => {
          if (column.field === "nmPatrimonio") {
            return { ...column, flex: 2 };
          }
          return column;
        });
    }
    return baseColumns;
  }

  return (
    <Container className={styles.formFields}>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6} xs={12}>
          <Autocomplete
            fullWidth
            options={state.departments}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) =>
              option.id + " - " + option.nmDepartamento
            }
            value={formik.values.departament}
            onChange={(event, newValue) => {
              formik.setFieldValue("departament", newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Departamento de Destino"
                error={formik.touched && Boolean(formik.errors.departament)}
                helperText={formik.touched && formik.errors.departament}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Data de Alocação"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            name="dtAlocacao"
            value={formik.values.dtAlocacao}
            onChange={formik.handleChange}
            error={formik.touched && Boolean(formik.errors.dtAlocacao)}
            helperText={formik.touched && formik.errors.dtAlocacao}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Observação"
            value={formik.values.observation}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          {formik.touched && formik.errors.patrimonies && (
            <FormHelperText error>{formik.errors.patrimonies}</FormHelperText>
          )}
        </Grid>
        <Grid item md={12} xs={12}>
          <DataGrid
            loading={isLoading}
            density="compact"
            slots={isMobile ? {} : { toolbar: GridToolbar }}
            sx={{
              height: 300,
            }}
            rows={state.patrimonies}
            columns={columns}
            onRowSelectionModelChange={(params) => {
              const selectedRowData = params.map((id) =>
                state.patrimonies.find((row) => row.id === id)
              );
              formik.setFieldValue("patrimonies", selectedRowData);
            }}
            autoPageSize
            checkboxSelection
            pageSizeOptions={[10]}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export { AllocationFormFields };
