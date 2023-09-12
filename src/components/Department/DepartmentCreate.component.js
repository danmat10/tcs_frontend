import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { DialogForm } from "components/Common";
import { DepartmentFormFields } from ".";
import { validateDepartmenCreateForm } from "validations";
import { handleCreateDepartment } from "services";

const DepartmentCreate = ({ onClose, users, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      nmDepartamento: "",
      user: null,
    },
    validate: (values) => validateDepartmenCreateForm(values),
    validateOnChange: false,
    onSubmit: (values) => {
      handleCreateDepartment({
        data: values,
        header: { Authorization: authHeader() },
        setState: setState,
      });
      formik.resetForm();
    },
  });

  const filteredUserList = users.filter((user) => {
    if (user.flStatus === "Inativo") {
      return false;
    }
    return true;
  });

  return (
    <DialogForm
      title="Cadastrar Departamento"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Cadastrar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <DepartmentFormFields formik={formik} userList={filteredUserList} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { DepartmentCreate };
