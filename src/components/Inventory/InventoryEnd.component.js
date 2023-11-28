import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import {
  DialogForm,
  formatBackendDateToField,
  formatFieldToDate,
} from "components/Common";
import { handleEditInventory } from "services/inventoryCalls";
import { InventoryFormFields } from "components/Inventory";
import { validateInventoryEndForm } from "validations";

const InventoryEnd = ({ onClose, setState, selectedInventory }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      dtAgendada: formatBackendDateToField(selectedInventory.dtAgendada),
      dtRealizada: null,
    },
    validate: (values) => validateInventoryEndForm(values),
    validateOnChange: false,
    onSubmit: (values) => {
      const data = {
        id: selectedInventory.id,
        dtAgendada: formatFieldToDate(values.dtAgendada),
        dtRealizada: formatFieldToDate(values.dtRealizada),
      };
      handleEditInventory({
        data,
        header: { Authorization: authHeader() },
        setState,
      });
      formik.resetForm();
    },
  });

  return (
    <DialogForm
      title="Finalizar Inventário"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Finalizar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <InventoryFormFields formik={formik} isEditing={true} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { InventoryEnd };
