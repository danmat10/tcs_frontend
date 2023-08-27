import React from "react";
import { FormikProvider, useFormik } from "formik";
import { useAuthHeader } from "react-auth-kit";

import { UserFormFields, validateUserCreateForm } from ".";
import { DialogForm } from "components/Common";
import { handleCreateUser } from "services/userCalls";

const CreateUser = ({ onClose, setState }) => {
  const authHeader = useAuthHeader();

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
      handleCreateUser({
        data: values,
        header: { Authorization: authHeader() },
        setState: setState,
      });
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
