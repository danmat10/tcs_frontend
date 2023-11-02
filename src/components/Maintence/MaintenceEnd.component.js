import { FormikProvider, useFormik } from "formik";
import { Grid, TextField } from "@mui/material";
import React from "react";
import { useAuthHeader } from "react-auth-kit";

import { styles } from ".";
import {
  CurrencyMask,
  DialogForm,
  formatBackendDateToField,
  formatFieldToDate,
} from "components/Common";
import { handleEndMaintence } from "services";
import { validateMaintenceEndForm } from "validations";

const MaintenceEnd = ({ onClose, setState, maintence }) => {
  const authHeader = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      patrimony: maintence.patrimony || null,
      nmTypeMaintence: maintence.nmTypeMaintence || "",
      dsMaintence: maintence.dsMaintence || "",
      dtPrevisionMaintence:
        formatBackendDateToField(maintence.dtPrevisionMaintence) || "",
      dtStartMaintence:
        formatBackendDateToField(maintence.dtStartMaintence) || "",
      dtEndMaintence: "",
      vlMaintence: 0,
      nmFornecedor: maintence.nmFornecedor || "",
      nrCnpj: maintence.nrCnpj || "",
      observation: maintence.observation || "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => validateMaintenceEndForm(values, maintence),
    onSubmit: (values) => {
      const data = {
        ...values,
        dtPrevisionMaintence: formatFieldToDate(values.dtPrevisionMaintence),
        dtStartMaintence: formatFieldToDate(values.dtStartMaintence),
        dtEndMaintence: formatFieldToDate(values.dtEndMaintence),
        id: maintence.id,
      };
      handleEndMaintence({
        data,
        header: { Authorization: authHeader() },
        setState,
      });
    },
  });

  return (
    <DialogForm
      title="Concluir Manutenção"
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
                  value={formik.values.patrimonio?.nmPatrimonio || ""}
                  disabled
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Fornecedor"
                  name="nmFornecedor"
                  variant="standard"
                  value={formik.values.nmFornecedor}
                  disabled
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Data de conclusão da manutenção"
                  type="date"
                  name="dtEndMaintence"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.dtEndMaintence}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.dtEndMaintence &&
                    Boolean(formik.errors.dtEndMaintence)
                  }
                  helperText={
                    formik.touched.dtEndMaintence &&
                    formik.errors.dtEndMaintence
                  }
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <CurrencyMask
                  formik={formik}
                  fieldName={"vlMaintence"}
                  label={"Valor da manutenção"}
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

export { MaintenceEnd };
