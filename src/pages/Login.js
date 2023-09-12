import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ReactComponent as Logo } from "assets/icons/logo.svg";
import { LoginFormFields } from "components/Login";
import { validateLoginForm } from "validations";
import { handleLogin } from "services";

const Login = () => {
  const signIn = useSignIn();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validate: (values) => validateLoginForm(values),
    onSubmit: (values) => {
      handleLogin({ data: values, signIn });
    },
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "linear-gradient(90.83deg, #0066FF 8.37%, #00C2FF 96.86%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          alignItems: "center",
          justifyContent: "center",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Logo style={{ width: "350px" }} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        elevation={6}
        sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
      >
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
              <Grid item xs={6}>
                <Link href="/forgot-password" variant="body2">
                  Esqueceu sua senha?
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export { Login };
