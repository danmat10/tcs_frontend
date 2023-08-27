import React from "react";
import { FormikProvider, useFormik } from "formik";

import { DialogForm } from "components/Common";
import { validateDepartmenEditForm } from "validations";
import DepartmentFormFields from "./DepartmentFormFields.component";

const DepartmentEdit = ({ department, users, onUpdate, onClose }) => {
  const formik = useFormik({
    initialValues: {
      nmDepartamento: department.nmDepartamento || "",
      usuario: department.usuario || "",
    },
    validate: (values) => validateDepartmenEditForm(values, department),
    validateOnChange: false,
    onSubmit: (values) => {
      values.id = department.id;
      onUpdate(values);
    },
  });

  const filteredUserList = users.filter((usuario) => {
    if (
      usuario.flStatus === "Inativo" &&
      formik.values.usuario?.id !== usuario.id
    ) {
      return false;
    }
    return true;
  });

  return (
    <DialogForm
      title="Editar Departamento"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Editar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <DepartmentFormFields formik={formik} userList={filteredUserList} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export default DepartmentEdit;
