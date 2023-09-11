import React from "react";
import { FieldArray } from "formik";
import {
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { styles } from ".";
import { CpfCnpjMask, CurrencyMask } from "components/Common";
import { DeleteOutlineSharp } from "@mui/icons-material";

const PatrimonyFormFields = ({ formik }) => {
  return (
    <Container className={styles.formFields}>
      <Grid container spacing={8}>
        <Grid item md={6} xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={12} xs={12}>
              <Typography variant="subtitle1">Patrimônio</Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Nome do Patrimônio"
                name="nmPatrimonio"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.nmPatrimonio}
                error={
                  formik.touched.nmPatrimonio &&
                  Boolean(formik.errors.nmPatrimonio)
                }
                helperText={
                  formik.touched.nmPatrimonio && formik.errors.nmPatrimonio
                }
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Nº de Série"
                name="nmSerie"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.nmSerie}
                error={formik.touched.nmSerie && Boolean(formik.errors.nmSerie)}
                helperText={formik.touched.nmSerie && formik.errors.nmSerie}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                name="nmDescricao"
                type="text"
                multiline
                rows={4}
                onChange={formik.handleChange}
                value={formik.values.nmDescricao}
                error={
                  formik.touched.nmDescricao &&
                  Boolean(formik.errors.nmDescricao)
                }
                helperText={
                  formik.touched.nmDescricao && formik.errors.nmDescricao
                }
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="subtitle1">Garantia</Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <FieldArray name="warranties">
                {({ push, remove }) => (
                  <>
                    {formik.values.warranties.map((warranty, index) => (
                      <Grid
                        container
                        spacing={2}
                        key={index}
                        alignItems="center"
                      >
                        <Grid item md={5} xs={12}>
                          <FormControl
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            error={
                              formik.touched.warranties &&
                              Boolean(
                                formik.errors.warranties?.[index]
                                  ?.dsTypeWarranty
                              )
                            }
                          >
                            <InputLabel
                              variant="outlined"
                              id={`warranties.${index}.dsTypeWarranty`}
                            >
                              Tipo de garantia
                            </InputLabel>
                            <Select
                              value={warranty.dsTypeWarranty}
                              onChange={formik.handleChange}
                              labelId={`warranties.${index}.dsTypeWarranty`}
                              label="Tipo de contato"
                              name={`warranties.${index}.dsTypeWarranty`}
                            >
                              <MenuItem value={"Fornecedor"}>
                                Fornecedor
                              </MenuItem>
                              <MenuItem value={"Legal"}>Legal</MenuItem>
                              <MenuItem value={"Estendida"}>Estendida</MenuItem>
                            </Select>
                            {formik.touched.warranties &&
                              formik.errors.warranties?.[index]
                                ?.dsTypeWarranty && (
                                <FormHelperText error>
                                  {
                                    formik.errors.warranties?.[index]
                                      ?.dsTypeWarranty
                                  }
                                </FormHelperText>
                              )}
                          </FormControl>
                        </Grid>
                        <Grid item md={6} xs={10}>
                          <TextField
                            fullWidth
                            label="Selecione a data"
                            name={`warranties.${index}.dsWarranty`}
                            type="date"
                            margin="dense"
                            InputLabelProps={{ shrink: true }}
                            onChange={formik.handleChange}
                            value={warranty.dsWarranty}
                            error={
                              formik.touched.warranties &&
                              Boolean(
                                formik.errors.warranties?.[index]?.dsWarranty
                              )
                            }
                            helperText={
                              formik.touched.warranties &&
                              formik.errors.warranties?.[index]?.dsWarranty
                            }
                          />
                        </Grid>
                        <Grid item xs={2} md={1}>
                          <IconButton
                            onClick={() => remove(index)}
                            color="secondary"
                          >
                            <DeleteOutlineSharp color="error" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={5}>
                        <FormControl component="fieldset" margin="dense">
                          <Button
                            onClick={() =>
                              push({
                                dsTypeWarranty: "Fornecedor",
                                dsWarranty: "",
                              })
                            }
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={12} xs={12}>
              <Typography variant="subtitle1">Fornecedor</Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <CpfCnpjMask formik={formik} fieldName="nmCpf" />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Nome do Fornecedor"
                name="nmFornecedor"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.nmFornecedor}
                error={
                  formik.touched.nmFornecedor &&
                  Boolean(formik.errors.nmFornecedor)
                }
                helperText={
                  formik.touched.nmFornecedor && formik.errors.nmFornecedor
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" marginTop={1}>
            <Grid item md={12} xs={12}>
              <Typography variant="subtitle1">Nota Fiscal</Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nº da Nota Fiscal"
                name="nmNF"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.nmNF}
                error={formik.touched.nmNF && Boolean(formik.errors.nmNF)}
                helperText={formik.touched.nmNF && formik.errors.nmNF}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Data de Nota Fiscal"
                name="dtNf"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={formik.handleChange}
                value={formik.values.dtNf}
                error={formik.touched.dtNf && Boolean(formik.errors.dtNf)}
                helperText={formik.touched.dtNf && formik.errors.dtNf}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Data de Aquisição"
                name="dtAquisicao"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={formik.handleChange}
                value={formik.values.dtAquisicao}
                error={
                  formik.touched.dtAquisicao &&
                  Boolean(formik.errors.dtAquisicao)
                }
                helperText={
                  formik.touched.dtAquisicao && formik.errors.dtAquisicao
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CurrencyMask
                formik={formik}
                fieldName="vlAquisicao"
                label="Valor de Aquisição"
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" marginTop={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Tipo de Patrimônio</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" margin="dense">
                <RadioGroup
                  row
                  aria-label="fixo"
                  name="fixo"
                  value={formik.values.fixo}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Fixo"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Alocável"
                  />
                  {formik.touched.fixo && formik.errors.fixo && (
                    <FormHelperText error>{formik.errors.fixo}</FormHelperText>
                  )}
                </RadioGroup>
              </FormControl>
            </Grid>
            {formik.touched && formik.errors._errors && (
              <FormHelperText error>{formik.errors._errors}</FormHelperText>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export { PatrimonyFormFields };
