import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { DialogForm } from "components/Common";
import { validateDepartmenEditForm } from "validations";
import { DepartmentFormFields } from ".";
import { handleEditDepartment } from "services";

const DepartmentEdit = ({ department, users, setState, onClose }) => {
  const authHeader = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      nmDepartamento: department.nmDepartamento || "",
      user: department.usuario || "",
    },
    validate: (values) => validateDepartmenEditForm(values, department),
    validateOnChange: false,
    onSubmit: (values) => {
      values.id = department.id;
      handleEditDepartment({
        data: values,
        header: { Authorization: authHeader() },
        setState,
      });
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

export { DepartmentEdit };
