import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { MESSAGES } from "../config";
import { apiCall, ENDPOINTS } from "../services";

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    // Você pode adicionar validações específicas para o email aqui, se necessário
    onSubmit: (values) => {
      onRequestPasswordReset(values);
    },
  });

  const handleApiCall = async (config, toastObject) => {
    const { method, endpoint, data } = config;
    const response = await apiCall(method, endpoint, data, {}, toastObject);
    return response;
  };

  const onRequestPasswordReset = async (values) => {
    // Supondo que existe um endpoint específico para solicitar a recuperação de senha
    let response = await handleApiCall(
      { method: "post", endpoint: ENDPOINTS.AUTH.REQUEST_RESET, data: values },
      MESSAGES.AUTH.REQUEST_RESET
    );

    // Aqui, você pode tratar a resposta conforme necessário
    if (response && response.success) {
      // Mostre uma mensagem de sucesso ou redirecione o usuário, se necessário
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
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Esqueceu sua senha?
        </Typography>
        <form onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Solicitar recuperação de senha
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Voltar ao login
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
