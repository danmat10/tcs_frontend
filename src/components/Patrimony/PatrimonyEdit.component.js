import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { PatrimonyFormFields } from ".";
import { DialogForm } from "components/Common";
import { validatePatrimonyEditForm } from "validations";
import { handleEditPatrimony } from "services";

const PatrimonyEdit = ({ onClose, patrimony, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      nmPatrimonio: patrimony.nmPatrimonio || "",
      nmSerie: patrimony.nmSerie || "",
      nmDescricao: patrimony.nmDescricao || "",
      nmCpf: patrimony.nmCpf || "",
      nmFornecedor: patrimony.nmFornecedor || "",
      nmNF: patrimony.nmNF || "",
      dtNf: patrimony.dtNf || "",
      dtAquisicao: patrimony.dtAquisicao || "",
      vlAquisicao: patrimony.vlAquisicao || 0,
      fixo: patrimony.fixo || "true",
      warranties: patrimony.warranties || [],
    },
    validateOnChange: false,
    validate: (values) => validatePatrimonyEditForm(values, patrimony),
    onSubmit: (values) => {
      values.id = patrimony.id;
      handleEditPatrimony({
        data: values,
        header: { Authorization: authHeader() },
        setState: setState,
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
