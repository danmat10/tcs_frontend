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

import { styles } from "components/Requisition";
import { PatrimonyStatusChip, PatriomonySearch } from "components/Patrimony";
import {
  handleGetPatrimoniesSearchRequisition,
  handleGetPatrimonyRequisitionId,
} from "services";

const RequisitionFormFields = ({ formik, state, setState }) => {
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
            options={state.constructions}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.id + " - " + option.nmObra}
            value={formik.values.obra}
            onChange={(event, newValue) => {
              formik.setFieldValue("obra", newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Obra de Destino"
                error={formik.touched && Boolean(formik.errors.obra)}
                helperText={formik.touched && formik.errors.obra}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Data de Previsão Retirada"
            type="date"
            name="dtPrevisaoRetirada"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.dtPrevisaoRetirada}
            onChange={formik.handleChange}
            error={formik.touched && Boolean(formik.errors.dtPrevisaoRetirada)}
            helperText={formik.touched && formik.errors.dtPrevisaoRetirada}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Data de Previsão Devolução"
            type="date"
            name="dtPrevisaoDevolucao"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.dtPrevisaoDevolucao}
            onChange={formik.handleChange}
            error={formik.touched && Boolean(formik.errors.dtPrevisaoDevolucao)}
            helperText={formik.touched && formik.errors.dtPrevisaoDevolucao}
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
          handleSearchPatrimonies={handleGetPatrimoniesSearchRequisition}
          handleGetPatrimonyId={handleGetPatrimonyRequisitionId}
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
              formik.setFieldValue("patrimonios", selectedRowData);
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

export { RequisitionFormFields };
