import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { DialogForm } from "components/Common";
import { PatrimonyFormFields } from "./PatrimonyFormFields.component";
import { validatePatrimonyCreateForm } from "validations";
import { handleCreatePatrimony } from "services";

const PatrimonyCreate = ({ onClose, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      nmPatrimonio: "",
      nmSerie: "",
      nmDescricao: "",
      nmCpf: "",
      nmFornecedor: "",
      nmNF: "",
      dtNf: "",
      dtAquisicao: "",
      vlAquisicao: 0,
      fixo: true,
      warranties: [
        {
          dsTypeWarranty: "Fornecedor",
          dsWarranty: "",
        },
      ],
      actualDepartment: "",
      actualConstruction: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: (values) => validatePatrimonyCreateForm(values),
    onSubmit: (values) => {
      handleCreatePatrimony({
        data: values,
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
