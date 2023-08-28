import React from "react";
import { FormikProvider, useFormik } from "formik";
import { useAuthHeader } from "react-auth-kit";

import { UserFormFields, validateUserEditForm } from ".";
import { DialogForm } from "components/Common";
import { handleEditUser } from "services/userCalls";

const UserEdit = ({ user, onClose, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      nmUsuario: user.nmUsuario || "",
      nrMatricula: user.nrMatricula || "",
      nrCpf: user.nrCpf || "",
      typeUser: user.typeUser || "",
      flStatus: user.flStatus || "",
      contacts: user.contacts || [],
    },
    validate: (values) => validateUserEditForm(values, user),
    validateOnChange: false,
    onSubmit: (values) => {
      values.id = user.id;
      handleEditUser({
        data: values,
        header: { Authorization: authHeader() },
        setState: setState,
      });
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
          <UserFormFields formik={formik} isEditing={true} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export default UserEdit;
