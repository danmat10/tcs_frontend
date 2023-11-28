import { Grid, TextField } from "@mui/material";
import { formatBackendDateToField, formatFieldToDate } from "components/Common";

const ReportRequestPending = ({ state, setState }) => {
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
          value={formatBackendDateToField(state.reportsConfig.pending.dtStart)}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                pending: {
                  ...state.reportsConfig.pending,
                  dtStart: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.pending.dtStart}
          helperText={
            state.errors.pending.dtStart &&
            state.errors.pending.dtStartErrorText
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
          value={formatBackendDateToField(state.reportsConfig.pending.dtEnd)}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                pending: {
                  ...state.reportsConfig.pending,
                  dtEnd: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.pending.dtEnd}
          helperText={
            state.errors.pending.dtEnd && state.errors.pending.dtEndErrorText
          }
        />
      </Grid>
    </>
  );
};

export { ReportRequestPending };
