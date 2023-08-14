import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import {
  MESSAGES,
  AUTH_TOKEN_EXPIRES_AT,
  REFRESH_TOKEN_EXPIRES_AT,
} from "../config";
import { apiCall, ENDPOINTS } from "../services";
import { LoginFormFields } from "../components/Login";
import { validateLoginForm } from "../validations";

const Login = (props) => {
  const signIn = useSignIn();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validate: (values) => validateLoginForm(values),
    onSubmit: (values) => {
      onLogin(values);
    },
  });

  const handleApiCall = async (config, toastObject) => {
    const { method, endpoint, data } = config;
    const response = await apiCall(method, endpoint, data, {}, toastObject);
    return response;
  };

  const onLogin = async (values) => {
    let response = await handleApiCall(
      { method: "post", endpoint: ENDPOINTS.AUTH.LOGIN, data: values },
      MESSAGES.AUTH.LOGIN
    );
    if (response) {
      signIn({
        expiresIn: AUTH_TOKEN_EXPIRES_AT,
        token: response.access_token,
        tokenType: "Bearer",
        refreshToken: response.refresh_token,
        refreshTokenExpireIn: REFRESH_TOKEN_EXPIRES_AT,
        authState: response.access_token,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Realizar Login
        </Typography>
        <form onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Esqueceu sua senha?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
