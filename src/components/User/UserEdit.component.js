import React from "react";
import { FormikProvider, useFormik } from "formik";
import { Button, DialogActions, Divider } from "@mui/material";
import { DialogTitle, DialogContent } from "@mui/material";

import { UserFormFields, validateUserEditForm, styles } from ".";

const UserEdit = ({ user, onUpdate, onClose }) => {
  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      cpf: user.cpf || "",
      registration: user.registration || "",
      permissions: user.permissions || "",
      active: user.active || false,
      contatos: user.contatos || [],
    },
    validate: (values) => validateUserEditForm(values, user),
    onSubmit: (values) => {
      values.id = user.id;
      onUpdate(values);
    },
  });

  return (
    <>
      <DialogTitle className={styles.userDialogTitle} paragraph>
        Editar Usuário
      </DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <UserFormFields formik={formik} isEditing={true} />
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
                Editar
              </Button>
            </DialogActions>
          </form>
        </FormikProvider>
      </DialogContent>
    </>
  );
};

export default UserEdit;
