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
      <FieldArray name="contacts">
        {({ push, remove }) => (
          <>
            {formik.values.contacts.map((contato, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid item md={5} xs={12}>
                  <FormControl
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={
                      formik.touched.contacts &&
                      Boolean(formik.errors.contacts?.[index]?.typeContacts)
                    }
                  >
                    <InputLabel
                      variant="outlined"
                      id={`contacts.${index}.typeContacts`}
                    >
                      Tipo de contato
                    </InputLabel>
                    <Select
                      value={contato.typeContacts}
                      onChange={formik.handleChange}
                      labelId={`contacts.${index}.typeContacts`}
                      label="Tipo de contato"
                      name={`contacts.${index}.typeContacts`}
                    >
                      <MenuItem value={"Celular"}>Celular</MenuItem>
                      <MenuItem value={"Telefone"}>Telefone</MenuItem>
                      <MenuItem value={"E-mail"}>E-mail</MenuItem>
                    </Select>
                    {formik.touched.contacts &&
                      formik.errors.contacts?.[index]?.typeContacts && (
                        <FormHelperText error>
                          {formik.errors.contacts?.[index]?.typeContacts}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>
                <Grid item md={5} xs={10}>
                  <TextField
                    fullWidth
                    label="Digite o contato"
                    name={`contacts.${index}.dsContato`}
                    type="text"
                    margin="normal"
                    onChange={formik.handleChange}
                    value={contato.dsContato}
                    error={
                      formik.touched.contacts &&
                      Boolean(formik.errors.contacts?.[index]?.dsContato)
                    }
                    helperText={
                      formik.touched.contacts &&
                      formik.errors.contacts?.[index]?.dsContato
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
            {formik.touched.contacts && formik.errors._errors && (
              <FormControl component="fieldset" margin="normal" fullWidth error>
                <FormHelperText>{formik.errors._errors}</FormHelperText>
              </FormControl>
            )}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <FormControl component="fieldset" margin="normal" fullWidth>
                  <Button
                    onClick={() => push({ typeContacts: "", dsContato: "" })}
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
