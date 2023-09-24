import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { FormikProvider, useFormik } from "formik";

import {
  DialogForm,
  formatBackendDateToField,
  formatFieldToDate,
} from "components/Common";
import { validateConstructionEditForm } from "validations";
import { handleEditConstruction } from "services";
import { ConstructionFormFields } from ".";

const ConstructionEdit = ({ construction, users, onClose, setState }) => {
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      nmObra: construction.nmObra || "",
      usuario: construction.usuario || "",
      nrCnpjCpf: construction.nrCnpjCpf || "",
      nmCliente: construction.nmCliente || "",
      nrCep: construction.nrCep || "",
      nmBairro: construction.nmBairro || "",
      nmLogradouro: construction.nmLogradouro || "",
      nrNumero: construction.nrNumero || "",
      nmComplemento: construction.nmComplemento || "",
      nmCidade: construction.nmCidade || "",
      nmUf: construction.nmUf || "",
      dtInicio: formatBackendDateToField(construction.dtInicio),
      dtPrevisaoConclusao: formatBackendDateToField(
        construction.dtPrevisaoConclusao
      ),
      dtFim: formatBackendDateToField(construction.dtFim),
    },
    validate: (values) => validateConstructionEditForm(values, construction),
    validateOnChange: false,
    onSubmit: (values) => {
      const data = {
        ...values,
        dtInicio: formatFieldToDate(values.dtInicio),
        dtPrevisaoConclusao: formatFieldToDate(values.dtPrevisaoConclusao),
        dtFim: formatFieldToDate(values.dtFim),
        id: construction.id,
      };
      handleEditConstruction({
        data,
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
