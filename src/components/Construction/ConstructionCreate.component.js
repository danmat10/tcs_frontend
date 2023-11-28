import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { DialogForm, formatFieldToDate } from "components/Common";
import { validateConstructionCreateForm } from "validations";
import { handleCreateConstruction } from "services";
import { ConstructionFormFields } from ".";

const ConstructionCreate = ({ onClose, users, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      nmObra: "",
      usuario: null,
      nrCnpjCpf: "",
      nmCliente: "",
      nrCep: "",
      nmBairro: "",
      nmLogradouro: "",
      nrNumero: "",
      nmComplemento: "",
      nmCidade: "",
      nmUf: "",
      dtInicio: "",
      dtPrevisaoConclusao: "",
      dtFim: "",
    },
    validate: (values) => validateConstructionCreateForm(values),
    validateOnChange: false,
    onSubmit: (values) => {
      const data = {
        ...values,
        dtInicio: formatFieldToDate(values.dtInicio),
        dtPrevisaoConclusao: formatFieldToDate(values.dtPrevisaoConclusao),
      };
      handleCreateConstruction({
        data,
        header: { Authorization: authHeader() },
        setState: setState,
      });
      formik.resetForm();
    },
  });

  const filteredUserList = users.filter((usuario) => {
    if (usuario.flStatus === "Inativo") {
      return false;
    }
    return true;
  });

  return (
    <DialogForm
      title="Cadastrar Obra"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Cadastrar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <ConstructionFormFields formik={formik} userList={filteredUserList} />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { ConstructionCreate };
