import { Grid, TextField } from "@mui/material";
import { formatBackendDateToField, formatFieldToDate } from "components/Common";

const ReportMaintenceSchedule = ({ state, setState }) => {
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
            state.reportsConfig.maintenceSchedule.dtStart
          )}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                maintenceSchedule: {
                  ...state.reportsConfig.maintenceSchedule,
                  dtStart: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.maintenceSchedule.dtStart}
          helperText={
            state.errors.maintenceSchedule.dtStart &&
            state.errors.maintenceSchedule.dtStartErrorText
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
            state.reportsConfig.maintenceSchedule.dtEnd
          )}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                maintenceSchedule: {
                  ...state.reportsConfig.maintenceSchedule,
                  dtEnd: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.maintenceSchedule.dtEnd}
          helperText={
            state.errors.maintenceSchedule.dtEnd &&
            state.errors.maintenceSchedule.dtEndErrorText
          }
        />
      </Grid>
    </>
  );
};

export { ReportMaintenceSchedule };
