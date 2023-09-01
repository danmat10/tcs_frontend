import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { DialogForm } from "components/Common";
import ConstructionFormFields from "./ConstructionFormFields.component";
import { validateConstructionCreateForm } from "validations";
import { handleCreateConstruction } from "services";

const ConstructionCreate = ({ onClose, users, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      nmObra: "",
      usuario: null,
      nmCpf: "",
      nmCliente: "",
      endereco: {
        nmCep: "",
        nmBairro: "",
        nmLogradouro: "",
        nmNumero: "",
        nmComplemento: "",
        nmCidade: "",
        nmEstado: "",
      },
      dtInicio: "",
      dtPrevisaoFinalizacao: "",
      dtFinalizacao: "",
    },
    validateOnChange: false,
    validate: (values) => validateConstructionCreateForm(values),
    onSubmit: (values) => {
      handleCreateConstruction({
        data: values,
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

export default ConstructionCreate;
