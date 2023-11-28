import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { DialogForm, formatFieldToDate } from "components/Common";
import { handleCreateInventory } from "services/inventoryCalls";
import { InventoryFormFields } from "./InventoryFormFields.component";
import { validateInventoryCreateForm } from "validations";

const InventoryCreate = ({ onClose, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      dtAgendada: null,
      dtRealizada: null,
    },
    validate: (values) => validateInventoryCreateForm(values),
    validateOnChange: false,
    onSubmit: (values) => {
      const data = {
        dtAgendada: formatFieldToDate(values.dtAgendada),
        dtRealizada: values.dtRealizada,
      };
      handleCreateInventory({
        data,
        header: { Authorization: authHeader() },
        setState,
      });
      formik.resetForm();
    },
  });

  return (
    <DialogForm
      title="Cadastrar Inventário"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Cadastrar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <InventoryFormFields formik={formik} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { InventoryCreate };
