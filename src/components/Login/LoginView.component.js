import { Box, Button, Grid, Link, Typography } from "@mui/material";

import { LoginFormFields } from "components/Login";
import { useFormik } from "formik";
import { validateLoginForm } from "validations";
import { handleLogin } from "services";

const LoginView = ({ state, setState }) => {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validate: (values) => validateLoginForm(values),
    onSubmit: (values) => {
      handleLogin({ data: values, state, setState });
    },
  });

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6">Login</Typography>
      <Typography variant="body2" sx={{ opacity: "0.6" }}>
        Realize o login no sistema
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <LoginFormFields formik={formik} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Fazer Login
        </Button>
        <Grid container>
          <Grid item xs={6}>
            <Link href="/forgot-password" variant="body2">
              Esqueceu sua senha?
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export { LoginView };
