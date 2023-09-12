import { FormikProvider, useFormik } from "formik";
import { Grid, TextField } from "@mui/material";
import React from "react";
import { useAuthHeader } from "react-auth-kit";

import { styles } from ".";
import { CurrencyMask, DialogForm } from "components/Common";
import { handleEditMaintence } from "services";
import { validateMaintenceEndForm } from "validations";

const MaintenceEnd = ({ onClose, setState, maintence }) => {
  const authHeader = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      patrimonio: maintence.patrimonio || null,
      nmTypeMaintence: maintence.nmTypeMaintence || "",
      dsMaintence: maintence.dsMaintence || "",
      dtPrevisionMaintence: maintence.dtPrevisionMaintence || "",
      dtStartMaintence: maintence.dtStartMaintence || "",
      nmFornecedor: maintence.nmFornecedor || "",
      nmCpf: maintence.nmCpf || "",
      observation: maintence.observation || "",
      dtEndMaintence: "",
      vlMaintence: 0,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => validateMaintenceEndForm(values, maintence),
    onSubmit: (values) => {
      values.id = maintence.id;
      handleEditMaintence({
        data: values,
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
