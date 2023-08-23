import React from "react";
import { FormikProvider, useFormik } from "formik";

import { UserFormFields, validateUserCreateForm } from ".";
import { DialogForm } from "components/Common";

const CreateUser = ({ onCreate, onClose }) => {
  const formik = useFormik({
    initialValues: {
      nmUsuario: "",
      nrMatricula: "",
      nrCpf: "",
      typeUser: "",
      flStatus: "Ativo",
      contacts: [{ typeContacts: "E-mail", dsContato: "" }],
    },
    validate: (values) => validateUserCreateForm(values),
    validateOnChange: false,
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
