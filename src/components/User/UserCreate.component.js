import React from "react";
import { FormikProvider, useFormik } from "formik";
import { Button, DialogActions, Divider } from "@mui/material";
import { DialogTitle, DialogContent } from "@mui/material";

import { UserFormFields, validateUserCreateForm, styles } from ".";

const CreateUser = ({ onCreate, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      registration: "",
      cpf: "",
      email: "",
      permissions: "",
      active: true,
      contatos: [{ tipo: "", contato: "" }],
    },
    validate: (values) => validateUserCreateForm(values),
    onSubmit: (values) => {
      onCreate(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <DialogTitle className={styles.userDialogTitle} paragraph>
        Cadastrar Usuário
      </DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <UserFormFields formik={formik} />
            <Divider sx={{ marginTop: 5 }} />
            <DialogActions>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onClose()}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained">
                Cadastrar
              </Button>
            </DialogActions>
          </form>
        </FormikProvider>
      </DialogContent>
    </>
  );
};

export default CreateUser;
