import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { AllocationFormFields } from ".";
import { DialogForm } from "components/Common";
import { handleCreateAllocation } from "services";
import { validateAllocationCreateForm } from "validations";

const AllocationCreate = ({ onClose, state, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      actualDepartment: null,
      newDepartment: null,
      observation: "",
      patrimonies: [],
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateAllocationCreateForm,
    onSubmit: (values) => {
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
