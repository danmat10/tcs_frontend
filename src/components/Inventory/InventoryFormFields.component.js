import { TextField, Grid, FormHelperText } from "@mui/material";
import { styles } from ".";

const InventoryFormFields = ({ formik, isEditing }) => {
  return (
    <div className={styles.formFields}>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={11} xs={12}>
          <TextField
            fullWidth
            label="Data de Previsão do Inventário"
            name="dtAgendada"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            value={formik.values.dtAgendada}
            error={
              formik.touched.dtAgendada && Boolean(formik.errors.dtAgendada)
            }
            helperText={formik.touched.dtAgendada && formik.errors.dtAgendada}
          />
        </Grid>
        {isEditing && (
          <Grid item md={11} xs={12}>
            <TextField
              fullWidth
              label="Data de Finalização do Inventário"
              name="dtRealizada"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={formik.handleChange}
              value={formik.values.dtRealizada}
              error={
                formik.touched.dtRealizada && Boolean(formik.errors.dtRealizada)
              }
              helperText={
                formik.touched.dtRealizada && formik.errors.dtRealizada
              }
            />
          </Grid>
        )}
      </Grid>
      {formik.touched && formik.errors._errors && (
        <FormHelperText error>{formik.errors._errors}</FormHelperText>
      )}
    </div>
  );
};

export { InventoryFormFields };
