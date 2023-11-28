import { Autocomplete, Grid, TextField } from "@mui/material";

const ReportPatrimonyAvailable = ({ state, setState }) => {
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
          value={state.reportsConfig.available.fixo}
          onChange={(event, newValue) => {
            setState({
              ...state,
              reportsConfig: {
                ...state.reportsConfig,
                available: {
                  ...state.reportsConfig.available,
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

export { ReportPatrimonyAvailable };
