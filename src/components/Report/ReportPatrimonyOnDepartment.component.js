import { Grid, TextField } from "@mui/material";
import { formatBackendDateToField, formatFieldToDate } from "components/Common";

const ReportPatrimonyOnDepartment = ({ state, setState }) => {
  return (
    <>
      <Grid item md={6} xs={12}>
        <TextField
          label="Data Inicial"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={formatBackendDateToField(
            state.reportsConfig.onDepartment.dtStart
          )}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                onDepartment: {
                  ...state.reportsConfig.onDepartment,
                  dtStart: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.onDepartment.dtStart}
          helperText={
            state.errors.onDepartment.dtStart &&
            state.errors.onDepartment.dtStartErrorText
          }
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          label="Data Final"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={formatBackendDateToField(
            state.reportsConfig.onDepartment.dtEnd
          )}
          onChange={(e) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                onDepartment: {
                  ...state.reportsConfig.onDepartment,
                  dtEnd: formatFieldToDate(e.target.value),
                },
              },
            });
          }}
          error={state.errors.onDepartment.dtEnd}
          helperText={
            state.errors.onDepartment.dtEnd &&
            state.errors.onDepartment.dtEndErrorText
          }
        />
      </Grid>
    </>
  );
};

export { ReportPatrimonyOnDepartment };
