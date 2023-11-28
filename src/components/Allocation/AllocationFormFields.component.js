import {
  TextField,
  Grid,
  FormHelperText,
  Autocomplete,
  Container,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import { useState } from "react";

import { styles } from "components/Allocation";
import { PatrimonyStatusChip, PatriomonySearch } from "components/Patrimony";
import {
  handleGetPatrimoniesSearchAllocation,
  handleGetPatrimonyAllocationId,
} from "services";

const AllocationFormFields = ({ formik, state, setState }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isLoading, setIsLoading] = useState(false);
  const columns = getColumns(isMobile);

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
        renderCell: (params) => <PatrimonyStatusChip patrimony={params.row} />,
        valueGetter: (params) => {
          return params.row.situacao;
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
        <Grid item md={12} xs={12}>
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
        <Grid item md={12} xs={12}>
          {formik.touched && formik.errors.patrimonies && (
            <FormHelperText error>{formik.errors.patrimonies}</FormHelperText>
          )}
        </Grid>
        <PatriomonySearch
          setState={setState}
          state={state}
          setIsLoading={setIsLoading}
          handleSearchPatrimonies={handleGetPatrimoniesSearchAllocation}
          handleGetPatrimonyId={handleGetPatrimonyAllocationId}
        />
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
