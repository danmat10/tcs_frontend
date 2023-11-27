import { Autocomplete, Grid, TextField } from "@mui/material";
import { formatBackendDateToField, formatFieldToDate } from "components/Common";

const ReportPatrimonyOnLoan = ({ state, setState }) => {
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
          value={formatBackendDateToField(state.reportsConfig.onLoan.dtStart)}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                onLoan: {
                  ...state.reportsConfig.onLoan,
                  dtStart: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.onLoan.dtStart}
          helperText={
            state.errors.onLoan.dtStart && state.errors.onLoan.dtStartErrorText
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
          value={formatBackendDateToField(state.reportsConfig.onLoan.dtEnd)}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                onLoan: {
                  ...state.reportsConfig.onLoan,
                  dtEnd: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.onLoan.dtEnd}
          helperText={
            state.errors.onLoan.dtEnd && state.errors.onLoan.dtEndErrorText
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

export { ReportPatrimonyOnLoan };
