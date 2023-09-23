import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { useAuthHeader } from "react-auth-kit";

import { handleGetPatrimoniesSearch, handleGetPatrimonyId } from "services";

const PatriomonyAutoComplete = ({ formik }) => {
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  const authHeader = useAuthHeader();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOptions = useCallback(async (inputValue) => {
    setLoading(true);
    if (/^\d+$/.test(inputValue)) {
      handleGetPatrimonyId({
        header: {
          Authorization: authHeader(),
        },
        setOptions,
        id: inputValue,
      });
    } else {
      if (inputValue.length < 3) {
        setLoading(false);
        setOptions([]);
        return;
      }
      handleGetPatrimoniesSearch({
        header: { Authorization: authHeader() },
        setState: setOptions,
        state: options,
        params: { nmPatrimonio: inputValue },
      });
    }
    setLoading(false);
  }, []);

  const debouncedFetchOptions = useCallback(
    debounce((...args) => fetchOptions(...args), 500),
    []
  );

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-autocomplete"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      noOptionsText="Sem Resultados"
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.id + " - " + option.nmPatrimonio}
      value={formik.values.patrimonio}
      onChange={(_, newValue) => {
        formik.setFieldValue("patrimonio", newValue);
      }}
      options={options}
      loading={loading}
      loadingText="Buscando..."
      onInputChange={(_, value, reason) => {
        if (reason === "input") {
          setLoading(true);
          debouncedFetchOptions(value);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Patrimônio"
          variant="outlined"
          error={formik.touched.patrimonio && Boolean(formik.errors.patrimonio)}
          helperText={
            formik.touched.patrimonio && formik.errors.patrimonio
              ? formik.errors.patrimonio
              : "Pesquise o código ou nome do patrimônio"
          }
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export { PatriomonyAutoComplete };
