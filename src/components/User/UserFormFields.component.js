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
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { FieldArray } from "formik";
const UserFormFields = ({ formik, isEditing = false }) => (
  <>
    <TextField
      fullWidth
      label="Digite o nome"
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
      label="Digite a matrícula"
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
      label="Digite o CPF"
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
      label="Digite o e-mail"
      name="email"
      type="email"
      margin="dense"
      onChange={formik.handleChange}
      value={formik.values.email}
      error={formik.touched.email && Boolean(formik.errors.email)}
      helperText={formik.touched.email && formik.errors.email}
    />
    <FormControl component="fieldset" margin="dense" fullWidth>
      <FieldArray name="contatos">
        {({ push, remove }) => (
          <>
            {formik.values.contatos.map((contato, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid item md={5} xs={12}>
                  <FormControl
                    fullWidth
                    margin="dense"
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
                <Grid item xs={2} md={1}>
                  <IconButton onClick={() => remove(index)} color="secondary">
                    <DeleteOutlineSharpIcon color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <FormControl component="fieldset" margin="dense" fullWidth>
                  <Button
                    onClick={() => push({ tipo: "", contato: "" })}
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
      <Grid item md={9}>
        <FormControl component="fieldset" margin="dense">
          <FormLabel component="legend">Permissões</FormLabel>
          <RadioGroup
            row
            aria-label="permissions"
            name="permissions"
            value={formik.values.permissions}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value="gestor"
              control={<Radio />}
              label="Gestor"
            />
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
      </Grid>
      {isEditing && (
        <Grid item md={3}>
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
        </Grid>
      )}
    </Grid>
  </>
);

export default UserFormFields;
