import React from "react";
import { FieldArray } from "formik";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  FormGroup,
  Switch,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material";

import { styles } from ".";
import { CpfCnpjMask } from "components/Common";
import { DeleteOutlineSharp } from "@mui/icons-material";

const UserFormFields = ({ formik, isEditing = false }) => {
  const handleSwitchChange = (event) => {
    const { name, checked } = event.target;
    formik.setFieldValue(name, checked ? "Ativo" : "Inativo");
  };

  return (
    <div className={styles.formFields}>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={11} xs={12}>
          <TextField
            fullWidth
            label="Digite o nome"
            name="nmUsuario"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nmUsuario}
            error={formik.touched.nmUsuario && Boolean(formik.errors.nmUsuario)}
            helperText={formik.touched.nmUsuario && formik.errors.nmUsuario}
          />
        </Grid>
        <Grid item md={11} xs={12}>
          <TextField
            fullWidth
            label="Digite a matrícula"
            name="nrMatricula"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nrMatricula}
            error={
              formik.touched.nrMatricula && Boolean(formik.errors.nrMatricula)
            }
            helperText={formik.touched.nrMatricula && formik.errors.nrMatricula}
          />
        </Grid>
        <Grid item md={11} xs={12}>
          <CpfCnpjMask formik={formik} fieldName="nrCpf" />
        </Grid>
      </Grid>
      <FormControl component="fieldset" margin="dense" fullWidth>
        <FieldArray name="contacts">
          {({ push, remove }) => (
            <>
              {formik.values.contacts.map((contato, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                  <Grid item md={5} xs={12}>
                    <FormControl
                      fullWidth
                      margin="dense"
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
                        <MenuItem value={"WhatsApp"}>WhatsApp</MenuItem>
                        <MenuItem value={"Instagran"}>Instagram</MenuItem>
                      </Select>
                      {formik.touched.contacts &&
                        formik.errors.contacts?.[index]?.typeContacts && (
                          <FormHelperText error>
                            {formik.errors.contacts?.[index]?.typeContacts}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={10}>
                    <TextField
                      fullWidth
                      label="Digite o contato"
                      name={`contacts.${index}.dsContato`}
                      type="text"
                      margin="dense"
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
                      <DeleteOutlineSharp color="error" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={5}>
                  <FormControl component="fieldset" margin="dense" fullWidth>
                    <Button
                      onClick={() =>
                        push({ typeContacts: "E-mail", dsContato: "" })
                      }
                      color="primary"
                      variant="outlined"
                    >
                      Adicionar Contato
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </>
          )}
        </FieldArray>
      </FormControl>
      <Grid container alignItems="center">
        <Grid
          item
          md={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "10px",
          }}
        >
          <Grid item md={8}>
            <FormLabel component="legend">Permissões</FormLabel>
          </Grid>
          {isEditing && (
            <Grid item md={3}>
              <FormGroup
                sx={{
                  alignItems: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.flStatus === "Ativo"}
                      onChange={handleSwitchChange}
                      name="flStatus"
                      color="primary"
                    />
                  }
                  label={
                    formik.values.flStatus === "Ativo" ? "Ativo" : "Inativo"
                  }
                  sx={{
                    marginRight: "0px",
                  }}
                />
                {formik.touched.flStatus && formik.errors.flStatus && (
                  <FormHelperText error>
                    {formik.errors.flStatus}
                  </FormHelperText>
                )}
              </FormGroup>
            </Grid>
          )}
        </Grid>
        <FormControl component="fieldset" margin="dense">
          <RadioGroup
            row
            aria-label="typeUser"
            name="typeUser"
            value={formik.values.typeUser}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="Gestor"
              control={<Radio />}
              label="Gestor"
            />
            <FormControlLabel value="Peão" control={<Radio />} label="Peão" />
            <FormControlLabel
              value="Admin"
              control={<Radio />}
              label="Administrador"
            />
            {formik.touched.typeUser && formik.errors.typeUser && (
              <FormHelperText error>{formik.errors.typeUser}</FormHelperText>
            )}
          </RadioGroup>
        </FormControl>
      </Grid>
      {formik.touched.contacts && formik.errors._errors && (
        <FormHelperText error>{formik.errors._errors}</FormHelperText>
      )}
    </div>
  );
};

export { UserFormFields };
