import { FormikProvider, useFormik } from "formik";
import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useAuthHeader } from "react-auth-kit";

import { styles } from ".";
import {
  CpfCnpjMask,
  DialogForm,
  formatBackendDateToField,
  formatFieldToDate,
} from "components/Common";
import { handleStartMaintence } from "services";
import { validateMaintenceStartForm } from "validations";

const MaintenceStart = ({ onClose, setState, maintence }) => {
  const authHeader = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      patrimony: maintence.patrimony || null,
      nmTypeMaintence: maintence.nmTypeMaintence || "",
      dsMaintence: maintence.dsMaintence || "",
      dtPrevisionMaintence:
        formatBackendDateToField(maintence.dtPrevisionMaintence) || "",
      dtStartMaintence: "",
      dtEndMaintence: "",
      vlMaintence: 0,
      nmFornecedor: maintence.nmFornecedor || "",
      nrCnpj: maintence.nrCnpj || "",
      observation: maintence.observation || "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => validateMaintenceStartForm(values, maintence),
    onSubmit: (values) => {
      const data = {
        ...values,
        dtPrevisionMaintence: formatFieldToDate(values.dtPrevisionMaintence),
        dtStartMaintence: formatFieldToDate(values.dtStartMaintence),
        dtEndMaintence: formatFieldToDate(values.dtEndMaintence),
        id: maintence.id,
      };
      handleStartMaintence({
        data,
        header: { Authorization: authHeader() },
        setState,
      });
    },
  });

  return (
    <DialogForm
      title="Iniciar Manutenção"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Salvar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.formFields}>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Patrimônio"
                  name="patrimonio"
                  variant="standard"
                  value={formik.values.patrimony?.nmPatrimonio || ""}
                  disabled
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography variant="subtitle1">Fornecedor</Typography>
              </Grid>
              <Grid item md={12} xs={12}>
                <CpfCnpjMask formik={formik} fieldName="nrCnpj" />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Nome do fornecedor"
                  name="nmFornecedor"
                  value={formik.values.nmFornecedor}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.nmFornecedor &&
                    Boolean(formik.errors.nmFornecedor)
                  }
                  helperText={
                    formik.touched.nmFornecedor && formik.errors.nmFornecedor
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Data de início da manutenção"
                  type="date"
                  name="dtStartMaintence"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.dtStartMaintence}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dtStartMaintence &&
                    Boolean(formik.errors.dtStartMaintence)
                  }
                  helperText={
                    formik.touched.dtStartMaintence &&
                    formik.errors.dtStartMaintence
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Observação"
                  multiline
                  rows={4}
                  name="observation"
                  value={formik.values.observation}
                  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>
          </div>
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { MaintenceStart };
