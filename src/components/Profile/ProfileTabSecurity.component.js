import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { Form, FormikProvider, useFormik } from "formik";
import { Box, Button, Grid, Typography } from "@mui/material";

import { ProfileChangePasswordFields, styles } from ".";
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
      formik.resetForm();
    },
    validate: (values) => passwordValidation(values),
    validateOnChange: false,
  });

  const onUpdate = async (values) => {
    await apiCall(
      "put",
      ENDPOINTS.USER.PROFILE.PUT_CHANGE_PASSWORD(auth().id),
      values,
      {
        Authorization: authHeader(),
      },
      MESSAGES.USER.PROFILE.PATCH_PASSWORD
    );
  };

  return (
    <Grid container spacing={3} className={styles.gridContainerTabSecurity}>
      <Grid
        item
        xs={12}
        md={4}
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
