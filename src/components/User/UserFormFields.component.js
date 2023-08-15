import React from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import { FieldArray } from "formik";

const UserFormFields = ({ formik, isEditing = false }) => (
  <>
    <TextField
      fullWidth
      label="Nome"
      name="name"
      type="text"
      margin="dense"
      onChange={formik.handleChange}
      value={formik.values.name}
      error={formik.touched.name && Boolean(formik.errors.name)}
      helperText={formik.touched.name && formik.errors.name}
    />
    <TextField
      fullWidth
      label="Matricula"
      name="registration"
      type="text"
      margin="dense"
      onChange={formik.handleChange}
      value={formik.values.registration}
      error={formik.touched.registration && Boolean(formik.errors.registration)}
      helperText={formik.touched.registration && formik.errors.registration}
    />
    <TextField
      fullWidth
      label="Cpf"
      name="cpf"
      type="text"
      margin="dense"
      onChange={formik.handleChange}
      value={formik.values.cpf}
      error={formik.touched.cpf && Boolean(formik.errors.cpf)}
      helperText={formik.touched.cpf && formik.errors.cpf}
    />
    <TextField
      fullWidth
      label="E-mail"
      name="email"
      type="email"
      margin="dense"
      onChange={formik.handleChange}
      value={formik.values.email}
      error={formik.touched.email && Boolean(formik.errors.email)}
      helperText={formik.touched.email && formik.errors.email}
    />
    <FormControl component="fieldset" margin="dense" fullWidth>
      <FormLabel component="legend">Contatos</FormLabel>
      <FieldArray name="contatos">
        {({ push, remove }) => (
          <>
            {formik.values.contatos.map((contato, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid item xs={4}>
                  <FormControl
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    error={
                      formik.touched.contatos &&
                      Boolean(formik.errors.contatos?.[index]?.tipo)
                    }
                  >
                    <InputLabel htmlFor={`contatos.${index}.tipo`}>
                      Tipo
                    </InputLabel>
                    <Select
                      label="Tipo"
                      name={`contatos.${index}.tipo`}
                      value={contato.tipo}
                      onChange={formik.handleChange}
                    >
                      <MenuItem value="">
                        <em>Nenhum</em>
                      </MenuItem>
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Contato"
                    name={`contatos.${index}.contato`}
                    type="text"
                    margin="dense"
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
                <Grid item xs={2}>
                  <IconButton onClick={() => remove(index)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              onClick={() => push({ tipo: "", contato: "" })}
              color="primary"
            >
              Adicionar Contato
            </Button>
          </>
        )}
      </FieldArray>
    </FormControl>
    <FormControl component="fieldset" margin="dense">
      <FormLabel component="legend">Permissões</FormLabel>
      <RadioGroup
        row
        aria-label="permissions"
        name="permissions"
        value={formik.values.permissions}
        onChange={formik.handleChange}
      >
        <FormControlLabel value="gestor" control={<Radio />} label="Gestor" />
        <FormControlLabel
          value="requisitante"
          control={<Radio />}
          label="Requisitante"
        />
        <FormControlLabel
          value="administrador"
          control={<Radio />}
          label="Administrador"
        />
        {formik.touched.permissions && formik.errors.permissions && (
          <FormHelperText error>{formik.errors.permissions}</FormHelperText>
        )}
      </RadioGroup>
    </FormControl>
    {isEditing && (
      <FormControl component="fieldset" margin="dense">
        <FormLabel component="legend">Situação</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={formik.values.active}
                onChange={formik.handleChange}
                name="active"
                color="primary"
              />
            }
            label={formik.values.active ? "Ativo" : "Inativo"}
          />
          {formik.touched.active && formik.errors.active && (
            <FormHelperText error>{formik.errors.active}</FormHelperText>
          )}
        </FormGroup>
      </FormControl>
    )}
  </>
);

export default UserFormFields;
