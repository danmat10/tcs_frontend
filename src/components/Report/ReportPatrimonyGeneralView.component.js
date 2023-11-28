import { Autocomplete, Grid, TextField } from "@mui/material";

const ReportPatrimonyGeneralView = ({ state, setState }) => {
  return (
    <>
      <Grid item xs={12} md={6}>
        <Autocomplete
          fullWidth
          options={[
            { value: true, label: "Fixo" },
            { value: false, label: "Requisitável" },
            { value: null, label: "Todos" },
          ]}
          value={state.reportsConfig.general.fixo}
          onChange={(event, newValue) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                general: {
                  ...state.reportsConfig.general,
                  fixo: newValue,
                },
              },
            });
          }}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField {...params} label="Tipo de patrimônio" />
          )}
        />
      </Grid>
    </>
  );
};

export { ReportPatrimonyGeneralView };
