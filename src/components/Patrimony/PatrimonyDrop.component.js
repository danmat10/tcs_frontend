import { FormikProvider, useFormik } from "formik";
import { Grid, TextField } from "@mui/material";
import React from "react";
import { useAuthHeader } from "react-auth-kit";

import { styles } from ".";
import { DialogForm, formatFieldToDate } from "components/Common";
import { handleDropPatrimony } from "services";
import { validatePatrionyDropForm } from "validations";

const PatrimonyDrop = ({ onClose, setState, patrimony }) => {
  const authHeader = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      observation: "",
      dtLost: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => validatePatrionyDropForm(values),
    onSubmit: (values) => {
      const data = {
        ...patrimony,
        lossTheft: {
          observation: values.observation,
          dtLost: formatFieldToDate(values.dtLost),
        },
      };
      handleDropPatrimony({
        data,
        header: { Authorization: authHeader() },
        setState,
      });
    },
  });

  return (
    <DialogForm
      title="Baixar Patrimônio"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Baixar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.formFields}>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Patrimônio"
                  name="patrimony"
                  variant="standard"
                  value={patrimony?.nmPatrimonio || ""}
                  disabled
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  fullWidth
                  label="Data da baixa"
                  type="date"
                  name="dtLost"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.dtLost}
                  onChange={formik.handleChange}
                  error={formik.touched.dtLost && Boolean(formik.errors.dtLost)}
                  helperText={formik.touched.dtLost && formik.errors.dtLost}
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

export { PatrimonyDrop };
