import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { MaintenceFormFields } from ".";
import { DialogForm, formatFieldToDate } from "components/Common";
import { handleCreateMaintence } from "services";
import { validateMaintenceCreateForm } from "validations";

const MaintenceCreate = ({ onClose, setState }) => {
  const authHeader = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      nmTypeMaintence: "",
      dsMaintence: "",
      vlMaintence: 0,
      observation: "",
      dtPrevisionMaintence: "",
      dtStartMaintence: "",
      dtEndMaintence: "",
      nmFornecedor: "",
      nrCnpj: "",
      patrimony: null,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateMaintenceCreateForm,
    onSubmit: (values) => {
      const data = {
        ...values,
        dtPrevisionMaintence: formatFieldToDate(values.dtPrevisionMaintence),
        dtStartMaintence: formatFieldToDate(values.dtStartMaintence),
        dtEndMaintence: formatFieldToDate(values.dtEndMaintence),
      };
      handleCreateMaintence({
        data,
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
