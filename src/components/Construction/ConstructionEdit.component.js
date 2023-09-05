import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import { DialogForm } from "components/Common";
import { validateConstructionEditForm } from "validations";
import { handleEditConstruction } from "services";
import { ConstructionFormFields } from ".";

const ConstructionEdit = ({ construction, users, onClose, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      nmObra: construction.nmObra || "",
      usuario: construction.usuario || "",
      nmCpf: construction.nmCpf || "",
      nmCliente: construction.nmCliente || "",
      endereco: {
        nmCep: construction.endereco.nmCep || "",
        nmBairro: construction.endereco.nmBairro || "",
        nmLogradouro: construction.endereco.nmLogradouro || "",
        nmNumero: construction.endereco.nmNumero || "",
        nmComplemento: construction.endereco.nmComplemento || "",
        nmCidade: construction.endereco.nmCidade || "",
        nmEstado: construction.endereco.nmEstado || "",
      },
      dtInicio: construction.dtInicio || "",
      dtPrevisaoFinalizacao: construction.dtPrevisaoFinalizacao || "",
      dtFinalizacao: construction.dtFinalizacao || "",
    },
    validate: (values) => validateConstructionEditForm(values, construction),
    validateOnChange: false,
    onSubmit: (values) => {
      values.id = construction.id;
      handleEditConstruction({
        data: values,
        header: { Authorization: authHeader() },
        setState: setState,
      });
    },
  });

  const filteredUserList = users.filter((usuario) => {
    if (
      usuario.flStatus === "Inativo" &&
      formik.values.usuario?.id !== usuario.id
    ) {
      return false;
    }
    return true;
  });

  return (
    <DialogForm
      title="Editar Obra"
      onClose={onClose}
      onSubmit={() => formik.submitForm()}
      btnSubmitName="Editar"
    >
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <ConstructionFormFields
            formik={formik}
            userList={filteredUserList}
            isEditing={true}
          />
        </form>
      </FormikProvider>
    </DialogForm>
  );
};

export { ConstructionEdit };
