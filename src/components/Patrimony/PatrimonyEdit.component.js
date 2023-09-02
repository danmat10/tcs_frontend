import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { PatrimonyFormFields } from ".";
import { DialogForm } from "components/Common";
import { validatePatrimonyEditForm } from "validations";
import { handleEditPatrimony } from "services";

const PatrimonyEdit = ({ onClose, patrimony, setState, state }) => {
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
    },
    validateOnChange: false,
    validate: (values) => validatePatrimonyEditForm(values),
    onSubmit: (values) => {
      handleEditPatrimony({
        data: values,
        header: { Authorization: authHeader() },
        setState: setState,
        state: state,
      });
      formik.resetForm();
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
