import { FormikProvider, useFormik } from "formik";
import React from "react";
import { useAuthHeader } from "react-auth-kit";

import { AllocationFormFields } from "components/Allocation";
import { DialogForm, formatFieldToDate } from "components/Common";
import { handleCreateAllocation } from "services";
import { validateAllocationCreateForm } from "validations";

const AllocationCreate = ({ onClose, state, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      dtAlocacao: "",
      observation: "",
      patrimonies: [],
      departament: null,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateAllocationCreateForm,
    onSubmit: (values) => {
      const data = {
        ...values,
        dtAlocacao: formatFieldToDate(values.dtAlocacao)
      };
      handleCreateAllocation({
        data,
        header: { Authorization: authHeader() },
        setState,
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
