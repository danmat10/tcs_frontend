import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { styles } from ".";
import { PatriomonyAutoComplete } from "components/Patrimony";
import { CpfCnpjMask } from "components/Common";

const MaintenceFormFields = ({ formik }) => {
  return (
    <div className={styles.formFields}>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={12} xs={12}>
          <PatriomonyAutoComplete formik={formik} />
        </Grid>
        <Grid item md={12} xs={12}>
          <FormControl
            fullWidth
            margin="dense"
            variant="outlined"
            error={
              formik.touched.nmTypeMaintence &&
              Boolean(formik.errors.nmTypeMaintence)
            }
          >
            <InputLabel variant="outlined" id={`nmTypeMaintence`}>
              Tipo de manutenção
            </InputLabel>
            <Select
              value={formik.values.nmTypeMaintence}
              onChange={formik.handleChange}
              labelId={`nmTypeMaintence`}
              label="Tipo de manutenção"
              name={`nmTypeMaintence`}
            >
              <MenuItem value={"Preventiva"}>Preventiva</MenuItem>
              <MenuItem value={"Corretiva"}>Corretiva</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            multiline
            rows={2}
            label="Descrição da manutenção"
            name="dsMaintence"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.dsMaintence}
            error={
              formik.touched.dsMaintence && Boolean(formik.errors.dsMaintence)
            }
            helperText={formik.touched.dsMaintence && formik.errors.dsMaintence}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Data de previsão"
            name="dtPrevisionMaintence"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={formik.handleChange}
            value={formik.values.dtPrevisionMaintence}
            error={
              formik.touched.dtPrevisionMaintence &&
              Boolean(formik.errors.dtPrevisionMaintence)
            }
            helperText={
              formik.touched.dtPrevisionMaintence &&
              formik.errors.dtPrevisionMaintence
            }
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={12} xs={12}>
              <Typography variant="subtitle1">Fornecedor</Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <CpfCnpjMask formik={formik} fieldName="nrCnpj" />
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
                  formik.touched.nmFornecedor &&
                  Boolean(formik.errors.nmFornecedor)
                }
                helperText={
                  formik.touched.nmFornecedor && formik.errors.nmFornecedor
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            fullWidth
            label="Observação"
            name="observation"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.observation}
            error={
              formik.touched.observation &&
              Boolean(formik.errors.observation)
            }
            helperText={
              formik.touched.observation && formik.errors.observation
            }
            multiline
            rows={2}
          />
        </Grid>
        {formik.touched && formik.errors._errors && (
          <Grid item md={12} xs={12}>
            <FormHelperText error>{formik.errors._errors}</FormHelperText>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
export { MaintenceFormFields };
