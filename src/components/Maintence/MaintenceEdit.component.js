import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { MaintenceFormFields } from ".";
import { DialogForm, formatBackendDateToField, formatFieldToDate } from "components/Common";
import { handleEditMaintence } from "services";
import { validateMaintenceEditForm } from "validations";

const MaintenceEdit = ({ onClose, setState, maintence }) => {
  const authHeader = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      nmTypeMaintence: maintence.nmTypeMaintence || "",
      dsMaintence: maintence.dsMaintence || "",
      vlMaintence: 0,
      observation: maintence.observation || "",
      dtPrevisionMaintence: formatBackendDateToField(maintence.dtPrevisionMaintence) || "",
      dtStartMaintence: "",
      dtEndMaintence: "",
      nmFornecedor: maintence.nmFornecedor || "",
      nrCnpj: maintence.nrCnpj || "",
      patrimony: maintence.patrimony || null,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => validateMaintenceEditForm(values, maintence),
    onSubmit: (values) => {
      const data = {
        id: maintence.id,
        ...values,
        dtPrevisionMaintence: formatFieldToDate(values.dtPrevisionMaintence),
        dtStartMaintence: formatFieldToDate(values.dtStartMaintence),
        dtEndMaintence: formatFieldToDate(values.dtEndMaintence),
      };
      handleEditMaintence({
        data,
        header: { Authorization: authHeader() },
        setState,
      });
    },
  });

  return (
    <DialogForm
      title="Editar Manutenção"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Editar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <MaintenceFormFields formik={formik} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { MaintenceEdit };
