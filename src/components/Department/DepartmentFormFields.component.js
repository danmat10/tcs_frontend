import { TextField, Grid, FormHelperText, Autocomplete } from "@mui/material";
import { styles } from ".";

const DepartmentFormFields = ({ formik, userList = [] }) => {
  return (
    <div className={styles.formFields}>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={11} xs={12}>
          <TextField
            fullWidth
            label="Nome do Departamento"
            name="nmDepartamento"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nmDepartamento}
            error={
              formik.touched.nmDepartamento &&
              Boolean(formik.errors.nmDepartamento)
            }
            helperText={
              formik.touched.nmDepartamento && formik.errors.nmDepartamento
            }
          />
        </Grid>
        <Grid item md={11} xs={12}>
          <Autocomplete
            fullWidth
            options={userList}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.id + " - " + option.nmUsuario}
            value={formik.values.usuario}
            onChange={(event, newValue) => {
              formik.setFieldValue("usuario", newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Responsável do Departamento"
                error={formik.touched.usuario && Boolean(formik.errors.usuario)}
                helperText={formik.touched.usuario && formik.errors.usuario}
              />
            )}
          />
        </Grid>
      </Grid>
      {formik.touched.contacts && formik.errors._errors && (
        <FormHelperText error>{formik.errors._errors}</FormHelperText>
      )}
    </div>
  );
};

export { DepartmentFormFields };
