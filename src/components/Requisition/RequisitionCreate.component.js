import { FormikProvider, useFormik } from "formik";
import React from "react";
import { useAuthHeader } from "react-auth-kit";

import { DialogForm, formatFieldToDate, getToday } from "components/Common";
import { RequisitionFormFields } from "components/Requisition";

const RequisitionCreate = ({ onClose, state, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {},
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
    },
  });

  return (
    <DialogForm
      title="Cadastrar Requisição"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Cadastrar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <RequisitionFormFields
            formik={formik}
            state={state}
            setState={setState}
          />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { RequisitionCreate };
