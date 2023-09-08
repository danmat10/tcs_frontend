import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { MaintenceFormFields } from ".";
import { DialogForm } from "components/Common";
import { handleCreateMaintence } from "services";
import { validateMaintenceCreateForm } from "validations";

const MaintenceCreate = ({ onClose, setState }) => {
  const authHeader = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      patrimonio: null,
      nmTypeMaintence: "",
      dsMaintence: "",
      dtPrevisionMaintence: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateMaintenceCreateForm,
    onSubmit: (values) => {
      handleCreateMaintence({
        data: values,
        header: { Authorization: authHeader() },
        setState,
      });
      formik.resetForm();
    },
  });

  return (
    <DialogForm
      title="Cadastrar Manutenção"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Cadastrar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <MaintenceFormFields formik={formik} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { MaintenceCreate };
