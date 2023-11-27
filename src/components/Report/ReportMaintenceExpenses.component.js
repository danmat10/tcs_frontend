import { Grid, TextField } from "@mui/material";
import { formatBackendDateToField, formatFieldToDate, maskCurrencyFunction, unmaskCurrencyFunction } from "components/Common";

const ReportMaintenceExpenses = ({ state, setState }) => {
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
          value={formatBackendDateToField(
            state.reportsConfig.maintenceExpenses.dtStart
          )}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                maintenceExpenses: {
                  ...state.reportsConfig.maintenceExpenses,
                  dtStart: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.maintenceExpenses.dtStart}
          helperText={
            state.errors.maintenceExpenses.dtStart &&
            state.errors.maintenceExpenses.dtStartErrorText
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
          value={formatBackendDateToField(
            state.reportsConfig.maintenceExpenses.dtEnd
          )}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                maintenceExpenses: {
                  ...state.reportsConfig.maintenceExpenses,
                  dtEnd: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.maintenceExpenses.dtEnd}
          helperText={
            state.errors.maintenceExpenses.dtEnd &&
            state.errors.maintenceExpenses.dtEndErrorText
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label={"Valor Mínimo"}
          type="text"
          onChange={(e) => {
            const value = unmaskCurrencyFunction(e.target.value);
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                maintenceExpenses: {
                  ...state.reportsConfig.maintenceExpenses,
                  vlMin: value,
                },
              },
            });
          }}
          value={maskCurrencyFunction(
            state.reportsConfig.maintenceExpenses.vlMin
          )}
          error={state.errors.maintenceExpenses.vlMin}
          helperText={
            state.errors.maintenceExpenses.vlMin &&
            state.errors.maintenceExpenses.vlMinErrorText
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label={"Valor Máximo"}
          type="text"
          onChange={(e) => {
            const value = unmaskCurrencyFunction(e.target.value);
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                maintenceExpenses: {
                  ...state.reportsConfig.maintenceExpenses,
                  vlMax: value,
                },
              },
            });
          }}
          value={maskCurrencyFunction(
            state.reportsConfig.maintenceExpenses.vlMax
          )}
          error={state.errors.maintenceExpenses.vlMax}
          helperText={
            state.errors.maintenceExpenses.vlMax &&
            state.errors.maintenceExpenses.vlMaxErrorText
          }
        />
      </Grid>
    </>
  );
};

export { ReportMaintenceExpenses };
