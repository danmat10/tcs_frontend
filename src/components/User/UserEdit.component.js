import React from "react";
import { FormikProvider, useFormik } from "formik";

import { UserFormFields, validateUserEditForm } from ".";
import { DialogForm } from "components/Common";

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
    <DialogForm
      title="Editar Usuário"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Editar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <UserFormFields formik={formik} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export default UserEdit;
