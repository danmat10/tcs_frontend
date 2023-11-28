import { Autocomplete, Grid, TextField } from "@mui/material";
import { formatBackendDateToField, formatFieldToDate } from "components/Common";

const ReportPatrimonyByLoan = ({ state, setState }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          label="Data Inicial"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={formatBackendDateToField(state.reportsConfig.byLoan.dtStart)}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                byLoan: {
                  ...state.reportsConfig.byLoan,
                  dtStart: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.byLoan.dtStart}
          helperText={
            state.errors.byLoan.dtStart && state.errors.byLoan.dtStartErrorText
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Data Final"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={formatBackendDateToField(state.reportsConfig.byLoan.dtEnd)}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                byLoan: {
                  ...state.reportsConfig.byLoan,
                  dtEnd: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.byLoan.dtEnd}
          helperText={
            state.errors.byLoan.dtEnd && state.errors.byLoan.dtEndErrorText
          }
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Autocomplete
          fullWidth
          options={state.constructions}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.id + " - " + option.nmObra}
          value={state.selectedConstruction}
          onChange={(event, newValue) => {
            setState({ ...state, selectedConstruction: newValue });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Obra de Destino" />
          )}
        />
      </Grid>
    </>
  );
};

export { ReportPatrimonyByLoan };
