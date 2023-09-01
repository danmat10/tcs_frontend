import {
  TextField,
  Grid,
  Autocomplete,
  Typography,
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
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Cliente</Typography>
        </Grid>
        <Grid item md={12} xs={12}>
          <CpfCnpjMask formik={formik} fieldName="nmCpf" />
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
            name="dtPrevisaoFinalizacao"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={formik.handleChange}
            value={formik.values.dtPrevisaoFinalizacao}
            error={
              formik.touched.dtPrevisaoFinalizacao &&
              Boolean(formik.errors.dtPrevisaoFinalizacao)
            }
            helperText={
              formik.touched.dtPrevisaoFinalizacao &&
              formik.errors.dtPrevisaoFinalizacao
            }
          />
        </Grid>
        {isEditing && (
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Data de Finalização"
              name="dtFinalizacao"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={formik.handleChange}
              value={formik.values.dtFinalizacao}
              error={
                formik.touched.dtFinalizacao &&
                Boolean(formik.errors.dtFinalizacao)
              }
              helperText={
                formik.touched.dtFinalizacao && formik.errors.dtFinalizacao
              }
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ConstructionFormFields;
