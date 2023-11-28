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
  const [state, setState] = useState({ patrimonies: [] });
  const [loading, setLoading] = useState(false);

  const fetchOptions = useCallback(async (inputValue) => {
    setLoading(true);
    if (/^\d+$/.test(inputValue)) {
      handleGetPatrimonyId({
        header: {
          Authorization: authHeader(),
        },
        state,
        setState,
        id: inputValue,
      });
    } else {
      if (inputValue.length < 3) {
        setLoading(false);
        setState({ patrimonies: [] });
        return;
      }
      handleGetPatrimoniesSearch({
        header: { Authorization: authHeader() },
        setState,
        state,
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
      setState({ patrimonies: [] });
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
      value={formik.values.patrimony}
      onChange={(_, newValue) => {
        formik.setFieldValue("patrimony", newValue);
      }}
      options={state.patrimonies}
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
          error={formik.touched.patrimony && Boolean(formik.errors.patrimony)}
          helperText={
            formik.touched.patrimony && formik.errors.patrimony
              ? formik.errors.patrimony
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
