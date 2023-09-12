import React, { useContext } from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { AllocationFormFields } from ".";
import { DialogForm } from "components/Common";
import { handleCreateAllocation } from "services";
import { validateAllocationCreateForm } from "validations";
import UserContext from "contexts/UserContext";

const AllocationCreate = ({ onClose, state, setState }) => {
  const { user } = useContext(UserContext);
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      user: null,
      dtAlocacao: new Date(),
      actualDepartment: null,
      newDepartment: null,
      observation: "",
      patrimonies: [],
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateAllocationCreateForm,
    onSubmit: (values) => {
      values.user = user;
      handleCreateAllocation({
        data: values,
        header: { Authorization: authHeader() },
        setState: setState,
      });
      formik.resetForm();
    },
  });

  return (
    <DialogForm
      title="Cadastrar Alocação"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Cadastrar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <AllocationFormFields
            formik={formik}
            state={state}
            setState={setState}
          />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { AllocationCreate };
