import {
  TextField,
  Grid,
  Autocomplete,
  Typography,
  FormHelperText,
} from "@mui/material";

import { AddressFormFields, styles } from ".";
import { CpfCnpjMask } from "components/Common";

const ConstructionFormFields = ({
  formik,
  userList = [],
  isEditing = false,
}) => {
  return (
    <div className={styles.formFields}>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Nome da Obra"
            name="nmObra"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nmObra}
            error={formik.touched.nmObra && Boolean(formik.errors.nmObra)}
            helperText={formik.touched.nmObra && formik.errors.nmObra}
          />
        </Grid>
        <Grid item md={12} xs={12}>
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
                label="Responsável da Obra"
                error={formik.touched.usuario && Boolean(formik.errors.usuario)}
                helperText={formik.touched.usuario && formik.errors.usuario}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Cliente</Typography>
        </Grid>
        <Grid item md={12} xs={12}>
          <CpfCnpjMask formik={formik} fieldName="nrCnpjCpf" />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Nome do Cliente"
            name="nmCliente"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nmCliente}
            error={formik.touched.nmCliente && Boolean(formik.errors.nmCliente)}
            helperText={formik.touched.nmCliente && formik.errors.nmCliente}
          />
        </Grid>
      </Grid>
      <AddressFormFields formik={formik} isEditing={isEditing} />
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Datas</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Data de Início"
            name="dtInicio"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={formik.handleChange}
            value={formik.values.dtInicio}
            error={formik.touched.dtInicio && Boolean(formik.errors.dtInicio)}
            helperText={formik.touched.dtInicio && formik.errors.dtInicio}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Previsão de Finalização"
            name="dtPrevisaoConclusao"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={formik.handleChange}
            value={formik.values.dtPrevisaoConclusao}
            error={
              formik.touched.dtPrevisaoConclusao &&
              Boolean(formik.errors.dtPrevisaoConclusao)
            }
            helperText={
              formik.touched.dtPrevisaoConclusao &&
              formik.errors.dtPrevisaoConclusao
            }
          />
        </Grid>
        {isEditing && (
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Data de Finalização"
              name="dtFim"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              value={formik.values.dtFim}
              error={formik.touched.dtFim && Boolean(formik.errors.dtFim)}
              helperText={formik.touched.dtFim && formik.errors.dtFim}
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

export { ConstructionFormFields };
