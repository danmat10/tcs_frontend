import React from "react";
import { FieldArray } from "formik";
import {
  TextField,
  FormControl,
  FormHelperText,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";

const UserFormFields = ({ formik }) => (
  <>
    <FormControl component="fieldset" margin="normal" fullWidth>
      <FieldArray name="contatos">
        {({ push, remove }) => (
          <>
            {formik.values.contatos.map((contato, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid item md={5} xs={12}>
                  <FormControl
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={
                      formik.touched.contatos &&
                      Boolean(formik.errors.contatos?.[index]?.tipo)
                    }
                  >
                    <InputLabel
                      variant="outlined"
                      id={`contatos.${index}.tipo`}
                    >
                      Tipo de contato
                    </InputLabel>
                    <Select
                      value={contato.tipo}
                      onChange={formik.handleChange}
                      labelId={`contatos.${index}.tipo`}
                      label="Tipo de contato"
                      name={`contatos.${index}.tipo`}
                    >
                      <MenuItem value={"Celular"}>Celular</MenuItem>
                      <MenuItem value={"Telefone"}>Telefone</MenuItem>
                      <MenuItem value={"E-mail"}>E-mail</MenuItem>
                    </Select>
                    {formik.touched.contatos &&
                      formik.errors.contatos?.[index]?.tipo && (
                        <FormHelperText error>
                          {formik.errors.contatos?.[index]?.tipo}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>
                <Grid item md={5} xs={10}>
                  <TextField
                    fullWidth
                    label="Digite o contato"
                    name={`contatos.${index}.contato`}
                    type="text"
                    margin="normal"
                    onChange={formik.handleChange}
                    value={contato.contato}
                    error={
                      formik.touched.contatos &&
                      Boolean(formik.errors.contatos?.[index]?.contato)
                    }
                    helperText={
                      formik.touched.contatos &&
                      formik.errors.contatos?.[index]?.contato
                    }
                  />
                </Grid>
                <Grid item xs={2} md={1}>
                  <IconButton onClick={() => remove(index)} color="secondary">
                    <DeleteOutlineSharpIcon color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            {formik.touched.contatos && formik.errors._errors && (
              <FormControl component="fieldset" margin="normal" fullWidth error>
                <FormHelperText>{formik.errors._errors}</FormHelperText>
              </FormControl>
            )}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <FormControl component="fieldset" margin="normal" fullWidth>
                  <Button
                    onClick={() => push({ tipo: "", contato: "" })}
                    color="primary"
                    variant="outlined"
                  >
                    Adicionar
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </>
        )}
      </FieldArray>
    </FormControl>
  </>
);

export default UserFormFields;
