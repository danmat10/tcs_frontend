import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { MaintenceFormFields } from ".";
import { DialogForm } from "components/Common";
import { handleEditMaintence } from "services";
import { validateMaintenceEditForm } from "validations";

const MaintenceEdit = ({ onClose, setState, maintence }) => {
  const authHeader = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      patrimonio: maintence.patrimonio || null,
      nmTypeMaintence: maintence.nmTypeMaintence || "",
      dsMaintence: maintence.dsMaintence || "",
      dtPrevisionMaintence: maintence.dtPrevisionMaintence || "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => validateMaintenceEditForm(values, maintence),
    onSubmit: (values) => {
      values.id = maintence.id;
      handleEditMaintence({
        data: values,
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
