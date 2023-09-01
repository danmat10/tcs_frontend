import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { Form, FormikProvider, useFormik } from "formik";
import { Box, Button, Grid, Typography } from "@mui/material";

import { ProfileChangePasswordFields, styles } from ".";
import { handleEditPassword } from "services";
import { passwordValidation } from "validations/ProfileValidations";

const ProfileTabSecurity = () => {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: (values) => passwordValidation(values),
    validateOnChange: false,
    onSubmit: (values) => {
      values.id = auth().id;
      handleEditPassword({
        data: values,
        header: {
          Authorization: authHeader(),
        },
      });
      formik.resetForm();
    },
  });

  return (
    <Grid container spacing={3} className={styles.gridContainerTabSecurity}>
      <Grid
        item
        xs={11}
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
};

export { ProfileTabSecurity };
