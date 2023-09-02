import { TextField, Grid, FormHelperText, Typography } from "@mui/material";
import { styles } from ".";
import { CpfCnpjMask, CurrencyMask } from "components/Common";

const PatrimonyFormFields = ({ formik }) => {
  return (
    <div className={styles.formFields}>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Nome do Patrimônio"
            name="nmPatrimonio"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nmPatrimonio}
            error={
              formik.touched.nmPatrimonio && Boolean(formik.errors.nmPatrimonio)
            }
            helperText={
              formik.touched.nmPatrimonio && formik.errors.nmPatrimonio
            }
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Nº de Série"
            name="nmSerie"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nmSerie}
            error={formik.touched.nmSerie && Boolean(formik.errors.nmSerie)}
            helperText={formik.touched.nmSerie && formik.errors.nmSerie}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Descrição"
            name="nmDescricao"
            type="text"
            multiline
            rows={2}
            onChange={formik.handleChange}
            value={formik.values.nmDescricao}
            error={
              formik.touched.nmDescricao && Boolean(formik.errors.nmDescricao)
            }
            helperText={formik.touched.nmDescricao && formik.errors.nmDescricao}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Fornecedor</Typography>
        </Grid>
        <Grid item md={12} xs={12}>
          <CpfCnpjMask formik={formik} fieldName="nmCpf" />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Nome do Fornecedor"
            name="nmFornecedor"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nmFornecedor}
            error={
              formik.touched.nmFornecedor && Boolean(formik.errors.nmFornecedor)
            }
            helperText={
              formik.touched.nmFornecedor && formik.errors.nmFornecedor
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" marginTop="auto">
        <Grid item md={12} xs={12}>
          <Typography variant="subtitle1">Nota Fiscal</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Nº da Nota Fiscal"
            name="nmNF"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nmNF}
            error={formik.touched.nmNF && Boolean(formik.errors.nmNF)}
            helperText={formik.touched.nmNF && formik.errors.nmNF}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Data de Nota Fiscal"
            name="dtNf"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={formik.handleChange}
            value={formik.values.dtNf}
            error={formik.touched.dtNf && Boolean(formik.errors.dtNf)}
            helperText={formik.touched.dtNf && formik.errors.dtNf}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Data de Aquisição"
            name="dtAquisicao"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={formik.handleChange}
            value={formik.values.dtAquisicao}
            error={
              formik.touched.dtAquisicao && Boolean(formik.errors.dtAquisicao)
            }
            helperText={formik.touched.dtAquisicao && formik.errors.dtAquisicao}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <CurrencyMask
            formik={formik}
            fieldName="vlAquisicao"
            label="Valor de Aquisição"
          />
        </Grid>
      </Grid>
      {formik.touched && formik.errors._errors && (
        <FormHelperText error>{formik.errors._errors}</FormHelperText>
      )}
    </div>
  );
};

export { PatrimonyFormFields };
