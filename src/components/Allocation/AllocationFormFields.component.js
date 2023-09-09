import {
  TextField,
  Grid,
  FormHelperText,
  Autocomplete,
  Chip,
  Container,
} from "@mui/material";
import { DataGrid, GridToolbar, ptBR } from "@mui/x-data-grid";
import { handleGetPatrimoniesParams } from "services";
import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";

import { styles } from ".";

const AllocationFormFields = ({ formik, state, setState }) => {
  const [isLoading, setIsLoading] = useState(false);
  const authHeader = useAuthHeader();
  const columns = [
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
        if (params.row.actualDepartment === "") {
          return "Não Alocado";
        }
        return params.row.actualDepartment.nmDepartamento;
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 2,
      renderCell: (params) => {
        if (params.row.fixo === "true") {
          return (
            <Chip label="Fixo" color="default" variant="filled" size="small" />
          );
        } else if (params.row.actualConstruction) {
          return (
            <Chip label="Em Obra" color="info" variant="filled" size="small" />
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

  return (
    <Container className={styles.formFields}>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={6} xs={12}>
          <Autocomplete
            fullWidth
            options={[
              { id: "", nmDepartamento: "Não Alocado" },
              ...state.departments,
            ]}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) =>
              option.id === ""
                ? option.nmDepartamento
                : `${option.id} - ${option.nmDepartamento}`
            }
            value={formik.values.actualDepartment}
            onChange={async (event, newValue) => {
              formik.setFieldValue("actualDepartment", newValue);
              if (newValue) {
                setIsLoading(true);
                await handleGetPatrimoniesParams({
                  header: {
                    Authorization: authHeader(),
                  },
                  setOptions: (data) => {
                    setState((prevState) => ({
                      ...prevState,
                      patrimonies: data,
                    }));
                  },
                  params: { actualDepartment: newValue.id },
                });
                setIsLoading(false);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Departamento de Origem"
                name="actualDepartment"
                error={
                  formik.touched.actualDepartment &&
                  Boolean(formik.errors.actualDepartment)
                }
                helperText={
                  formik.touched.actualDepartment &&
                  formik.errors.actualDepartment
                }
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Autocomplete
            fullWidth
            options={state.departments}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) =>
              option.id + " - " + option.nmDepartamento
            }
            value={formik.values.newDepartment}
            onChange={(event, newValue) => {
              formik.setFieldValue("newDepartment", newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Departamento de Destino"
                error={formik.touched && Boolean(formik.errors.newDepartment)}
                helperText={formik.touched && formik.errors.newDepartment}
              />
            )}
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
            slots={{
              toolbar: GridToolbar,
            }}
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
