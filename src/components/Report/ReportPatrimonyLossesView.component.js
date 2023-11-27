import { Grid, TextField } from "@mui/material";
import { formatBackendDateToField, formatFieldToDate } from "components/Common";

const ReportPatrimonyLossesView = ({ state, setState }) => {
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
          value={formatBackendDateToField(state.reportsConfig.losses.dtStart)}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                losses: {
                  ...state.reportsConfig.losses,
                  dtStart: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.losses.dtStart}
          helperText={
            state.errors.losses.dtStart && state.errors.losses.dtStartErrorText
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
          value={formatBackendDateToField(state.reportsConfig.losses.dtEnd)}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                losses: {
                  ...state.reportsConfig.losses,
                  dtEnd: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.losses.dtEnd}
          helperText={
            state.errors.losses.dtEnd && state.errors.losses.dtEndErrorText
          }
        />
      </Grid>
    </>
  );
};

export { ReportPatrimonyLossesView };
