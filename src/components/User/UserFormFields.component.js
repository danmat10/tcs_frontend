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
import { styles } from ".";

const UserFormFields = ({ formik, isEditing = false }) => (
  <div className={styles.formFields}>
    <Grid container spacing={2} alignItems="center">
      <Grid item md={11} xs={12}>
        <TextField
          fullWidth
          label="Digite o nome"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        /></Grid>
      <Grid item md={11} xs={12}>
        <TextField
          fullWidth
          label="Digite a matrícula"
          name="registration"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.registration}
          error={formik.touched.registration && Boolean(formik.errors.registration)}
          helperText={formik.touched.registration && formik.errors.registration}
        />
      </Grid>
      <Grid item md={11} xs={12}>
        <TextField
          fullWidth
          label="Digite o CPF"
          name="cpf"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.cpf}
          error={formik.touched.cpf && Boolean(formik.errors.cpf)}
          helperText={formik.touched.cpf && formik.errors.cpf}
        />
      </Grid>
      <Grid item md={11} xs={12}>
        <TextField
          fullWidth
          label="Digite o e-mail"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
    </Grid>
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
                <Grid item md={6} xs={10}>
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
      <Grid item md={12} sx={
        {
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
        }
      }>
        <Grid item md={8}>
          <FormLabel component="legend">Permissões</FormLabel>
        </Grid>
        {isEditing && (
          <Grid item md={3}>
            <FormGroup sx={{
              alignItems: "center",
            }}>
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
                sx={{
                  marginRight: "0px",
                }}
              />
              {formik.touched.active && formik.errors.active && (
                <FormHelperText error>{formik.errors.active}</FormHelperText>
              )}
            </FormGroup>
          </Grid>
        )}
      </Grid>
      <FormControl component="fieldset" margin="dense">
        <RadioGroup
          row
          aria-label="permissions"
          name="permissions"
          value={formik.values.permissions}
          onChange={formik.handleChange}
        >
          <FormControlLabel
            value="Gestor"
            control={<Radio />}
            label="Gestor"
          />
          <FormControlLabel
            value="Requisitante"
            control={<Radio />}
            label="Requisitante"
          />
          <FormControlLabel
            value="Administrador"
            control={<Radio />}
            label="Administrador"
          />
          {formik.touched.permissions && formik.errors.permissions && (
            <FormHelperText error>{formik.errors.permissions}</FormHelperText>
          )}
        </RadioGroup>
      </FormControl>
    </Grid>
  </div>
);

export default UserFormFields;
