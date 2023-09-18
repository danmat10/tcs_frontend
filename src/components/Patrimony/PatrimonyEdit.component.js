import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { PatrimonyFormFields } from ".";
import {
  DialogForm,
  formatBackendDateToField,
  formatFieldToDate,
} from "components/Common";
import { validatePatrimonyEditForm } from "validations";
import { handleEditPatrimony } from "services";

const PatrimonyEdit = ({ onClose, patrimony, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      nmPatrimonio: patrimony.nmPatrimonio || "",
      nrSerie: patrimony.nrSerie || "",
      nmDescricao: patrimony.nmDescricao || "",
      nrCnpj: patrimony.nrCnpj || "",
      nmFornecedor: patrimony.nmFornecedor || "",
      nrNF: patrimony.nrNF || "",
      dtNF: formatBackendDateToField(patrimony.dtNF),
      dtAquisicao: formatBackendDateToField(patrimony.dtAquisicao),
      vlAquisicao: patrimony.vlAquisicao || 0,
      fixo: patrimony.fixo || "true",
      warranties:
        patrimony.warranties.map((warranty) => ({
          ...warranty,
          dtValidade: formatBackendDateToField(warranty.dtValidade),
        })) || [],
    },
    validateOnChange: false,
    validate: (values) => validatePatrimonyEditForm(values, patrimony),
    onSubmit: (values) => {
      const data = {
        ...values,
        id: patrimony.id,
        dtNF: formatFieldToDate(values.dtNF),
        dtAquisicao: formatFieldToDate(values.dtAquisicao),
        warranties: values.warranties.map((warranty) => ({
          ...warranty,
          dtValidade: formatFieldToDate(warranty.dtValidade),
        })),
      };
      handleEditPatrimony({
        data,
        header: { Authorization: authHeader() },
        setState,
      });
    },
  });

  return (
    <DialogForm
      title="Editar Patrimônio"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Editar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <PatrimonyFormFields formik={formik} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { PatrimonyEdit };
