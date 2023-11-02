import { FormikProvider, useFormik } from "formik";
import React from "react";
import { useAuthHeader } from "react-auth-kit";

import { DialogForm, formatFieldToDate } from "components/Common";
import { RequisitionFormFields } from "components/Requisition";
import { handleCreateRequisition } from "services";
import { validateRequisitionCreateForm } from "validations";

const RequisitionCreate = ({ onClose, state, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      dtRetirada: "",
      dtDevolucao: "",
      patrimonios: [],
      obra: null,
    },
    validate: validateRequisitionCreateForm,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const data = {
        ...values,
        dtRetirada: formatFieldToDate(values.dtRetirada),
        dtDevolucao: formatFieldToDate(values.dtDevolucao)
      };
      handleCreateRequisition({
        data,
        header: { Authorization: authHeader() },
        setState,
      });
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
