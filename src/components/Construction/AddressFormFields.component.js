const { Grid, Typography, TextField } = require("@mui/material");
const { UfField } = require("components/Common");
const { useState, useRef } = require("react");
const { handleBuscaCep } = require("services");

const AddressFormFields = ({ formik, isEditing }) => {
  const [isCEPValid, setIsCEPValid] = useState(isEditing);
  const [isCEPBlur, setIsCEPBlur] = useState(false);
  const bairroRef = useRef();
  const cepRef = useRef();

  function isValidCEP(cep) {
    const regex = /^[0-9]{5}-[0-9]{3}$/;
    return regex.test(cep);
  }

  function handleCEPChange(event) {
    const cep = maskCEP(event.target.value);
    formik.setFieldValue("endereco.nmCep", cep);
  }

  function maskCEP(cep) {
    return cep
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .substr(0, 9);
  }

  const handleCEPBlur = async (e) => {
    setIsCEPBlur(true);
    const invalidCep = () => {
      setIsCEPValid(false);
      formik.setFieldValue("endereco.nmBairro", "");
      formik.setFieldValue("endereco.nmLogradouro", "");
      formik.setFieldValue("endereco.nmCidade", "");
      formik.setFieldValue("endereco.nmEstado", "");
      cepRef.current.focus();
    };
    const cep = e.target.value;
    const isValid = isValidCEP(cep);
    if (!isValid) {
      invalidCep();
      return;
    }
    const response = await handleBuscaCep(cep);
    if (response) {
      formik.setFieldValue("endereco.nmBairro", response.bairro);
      formik.setFieldValue("endereco.nmLogradouro", response.logradouro);
      formik.setFieldValue("endereco.nmCidade", response.localidade);
      formik.setFieldValue("endereco.nmEstado", response.uf);
      setIsCEPValid(isValid);
      bairroRef.current.focus();
    } else {
      invalidCep();
    }
  };
  return (
    <Grid container spacing={2} alignItems="center" marginTop="auto">
      <Grid item md={12} xs={12}>
        <Typography
          variant="subtitle1"
          ref={cepRef}
          tabIndex={0}
          style={{
            outline: "none",
          }}
        >
          Endereço da Obra
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          label="CEP"
          name="endereco.nmCep"
          type="text"
          onChange={handleCEPChange}
          onBlur={handleCEPBlur}
          value={formik.values.endereco.nmCep}
          error={!isCEPValid && isCEPBlur}
          helperText={!isCEPValid && isCEPBlur && "Cep inválido, verifique."}
          inputProps={{
            maxLength: 9,
          }}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          disabled={!isCEPValid}
          fullWidth
          inputRef={bairroRef}
          label="Bairro"
          name="endereco.nmBairro"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.endereco.nmBairro}
          error={
            formik.touched.endereco?.nmBairro &&
            Boolean(formik.errors.endereco?.nmBairro)
          }
          helperText={
            formik.touched.endereco?.nmBairro &&
            formik.errors.endereco?.nmBairro
          }
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextField
          disabled={!isCEPValid}
          fullWidth
          label="Logradouro"
          name="endereco.nmLogradouro"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.endereco.nmLogradouro}
          error={
            formik.touched.endereco?.nmLogradouro &&
            Boolean(formik.errors.endereco?.nmLogradouro)
          }
          helperText={
            formik.touched.endereco?.nmLogradouro &&
            formik.errors.endereco?.nmLogradouro
          }
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          disabled={!isCEPValid}
          fullWidth
          label="Número"
          name="endereco.nmNumero"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.endereco.nmNumero}
          error={
            formik.touched.endereco?.nmNumero &&
            Boolean(formik.errors.endereco?.nmNumero)
          }
          helperText={
            formik.touched.endereco?.nmNumero &&
            formik.errors.endereco?.nmNumero
          }
        />
      </Grid>
      <Grid item md={8} xs={12}>
        <TextField
          disabled={!isCEPValid}
          fullWidth
          label="Complemento"
          name="endereco.nmComplemento"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.endereco.nmComplemento}
          error={
            formik.touched.endereco?.nmComplemento &&
            Boolean(formik.errors.endereco?.nmComplemento)
          }
          helperText={
            formik.touched.endereco?.nmComplemento &&
            formik.errors.endereco?.nmComplemento
          }
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          disabled={!isCEPValid}
          fullWidth
          label="Cidade"
          name="endereco.nmCidade"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.endereco.nmCidade}
          error={
            formik.touched.endereco?.nmCidade &&
            Boolean(formik.errors.endereco?.nmCidade)
          }
          helperText={
            formik.touched.endereco?.nmCidade &&
            formik.errors.endereco?.nmCidade
          }
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <UfField formik={formik} disabled={!isCEPValid} />
      </Grid>
    </Grid>
  );
};

export { AddressFormFields };
