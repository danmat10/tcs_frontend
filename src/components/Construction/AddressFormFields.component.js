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
    formik.setFieldValue("nrCep", cep);
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
      formik.setFieldValue("nmBairro", "");
      formik.setFieldValue("nmLogradouro", "");
      formik.setFieldValue("nmCidade", "");
      formik.setFieldValue("nmUf", "");
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
      formik.setFieldValue("nmBairro", response.bairro);
      formik.setFieldValue("nmLogradouro", response.logradouro);
      formik.setFieldValue("nmCidade", response.localidade);
      formik.setFieldValue("nmUf", response.uf);
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
          name="nrCep"
          type="text"
          onChange={handleCEPChange}
          onBlur={handleCEPBlur}
          value={formik.values.nrCep}
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
          name="nmBairro"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nmBairro}
          error={formik.touched.nmBairro && Boolean(formik.errors.nmBairro)}
          helperText={formik.touched.nmBairro && formik.errors.nmBairro}
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <TextField
          disabled={!isCEPValid}
          fullWidth
          label="Logradouro"
          name="nmLogradouro"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nmLogradouro}
          error={
            formik.touched.nmLogradouro && Boolean(formik.errors.nmLogradouro)
          }
          helperText={formik.touched.nmLogradouro && formik.errors.nmLogradouro}
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <TextField
          disabled={!isCEPValid}
          fullWidth
          label="Número"
          name="nrNumero"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nrNumero}
          error={formik.touched.nrNumero && Boolean(formik.errors.nrNumero)}
          helperText={formik.touched.nrNumero && formik.errors.nrNumero}
        />
      </Grid>
      <Grid item md={8} xs={12}>
        <TextField
          disabled={!isCEPValid}
          fullWidth
          label="Complemento"
          name="nmComplemento"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nmComplemento}
          error={
            formik.touched.nmComplemento && Boolean(formik.errors.nmComplemento)
          }
          helperText={
            formik.touched.nmComplemento && formik.errors.nmComplemento
          }
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          disabled={!isCEPValid}
          fullWidth
          label="Cidade"
          name="nmCidade"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nmCidade}
          error={formik.touched.nmCidade && Boolean(formik.errors.nmCidade)}
          helperText={formik.touched.nmCidade && formik.errors.nmCidade}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <UfField formik={formik} disabled={!isCEPValid} />
      </Grid>
    </Grid>
  );
};

export { AddressFormFields };
