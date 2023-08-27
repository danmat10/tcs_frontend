import React from "react";
import { FormikProvider, useFormik } from "formik";

import { DialogForm } from "components/Common";
import { DepartmentFormFields } from ".";
import { validateDepartmenCreateForm } from "validations";

const CreateDepartment = ({ onCreate, onClose, users }) => {
  const formik = useFormik({
    initialValues: {
      nmDepartamento: "",
      usuario: null,
    },
    validate: (values) => validateDepartmenCreateForm(values),
    validateOnChange: false,
    onSubmit: (values) => {
      onCreate(values);
      formik.resetForm();
    },
  });

  const filteredUserList = users.filter((usuario) => {
    if (usuario.flStatus === "Inativo") {
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

export default CreateDepartment;
