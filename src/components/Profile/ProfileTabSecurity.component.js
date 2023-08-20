import { Form, FormikProvider, useFormik } from "formik";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { Box, Button, Grid, Typography } from "@mui/material";

import { ProfileChangePasswordFields } from ".";
import apiCall from "../../services/apiCall";
import ENDPOINTS from "../../services/endpoints";
import { MESSAGES } from "../../config";
import { passwordValidation } from "../../validations/ProfileValidations";

export default function ProfileTabSecurity() {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: (values) => {
      onUpdate(values);
    },
    validate: (values) => passwordValidation(values),
    validateOnChange: false,
  });

  const onUpdate = async (values) => {
    await apiCall(
      "patch",
      ENDPOINTS.USER.PATCH_ID(auth().id),
      values,
      {
        Authorization: authHeader(),
      },
      MESSAGES.USER.PROFILE.PATCH_PASSWORD
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          margin: "auto",
        }}
      >
        <Typography variant="h5" textAlign="center">
          Alterar Senha
        </Typography>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <ProfileChangePasswordFields formik={formik} />
          </Form>
        </FormikProvider>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => formik.submitForm()}
          >
            Salvar mudanças
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
