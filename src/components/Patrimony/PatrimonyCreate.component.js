import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { DialogForm, formatFieldToDate } from "components/Common";
import { PatrimonyFormFields } from "./PatrimonyFormFields.component";
import { validatePatrimonyCreateForm } from "validations";
import { handleCreatePatrimony } from "services";

const PatrimonyCreate = ({ onClose, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      nmPatrimonio: "",
      nrSerie: "",
      nmDescricao: "",
      nrCnpj: "",
      nmFornecedor: "",
      nrNF: "",
      dtNF: "",
      dtAquisicao: "",
      vlAquisicao: 0,
      fixo: true,
      warranties: [
        {
          dsGarantia: "",
          dtValidade: "",
          tipoGarantia: "Contratual",
        },
      ],
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => validatePatrimonyCreateForm(values),
    onSubmit: (values) => {
      const data = {
        ...values,
        dtNF: formatFieldToDate(values.dtNF),
        dtAquisicao: formatFieldToDate(values.dtAquisicao),
        warranties: values.warranties.map((warranty) => ({
          ...warranty,
          dtValidade: formatFieldToDate(warranty.dtValidade),
        })),
      };
      handleCreatePatrimony({
        data,
        header: { Authorization: authHeader() },
        setState,
      });
      formik.resetForm();
    },
  });

  return (
    <DialogForm
      title="Cadastrar Patrimônio"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Cadastrar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <PatrimonyFormFields formik={formik} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { PatrimonyCreate };
