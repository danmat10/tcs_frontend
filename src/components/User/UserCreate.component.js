import React from "react";
import { FormikProvider, useFormik } from "formik";

import { UserFormFields, validateUserCreateForm } from ".";
import { DialogForm } from "../Common";

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
    <DialogForm
      title="Cadastrar Usuário"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Cadastrar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <UserFormFields formik={formik} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export default CreateUser;
