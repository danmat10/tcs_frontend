import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { MESSAGES } from "../config";
import { apiCall, ENDPOINTS } from "../services";
import { ReactComponent as Logo } from "../components/assets/icons/logo.svg";


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
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        sm={4}
        md={7}
        sx={{
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'linear-gradient(90.83deg, #0066FF 8.37%, #00C2FF 96.86%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          alignItems: "center",
          justifyContent: "center",
          display: { xs: 'none', sm: 'flex' }
        }}
      >
        <Logo style={{ width: "350px" }} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} elevation={6} sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: "60%"
          }}
        >
          <Typography component="h1" variant="h5">
            Esqueceu sua senha?
          </Typography>
          <Typography variant="body2" sx={{ opacity: "0.6" }}>
            Digite o e-mail válido para alteração de senha
          </Typography>
          <form onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail válido"
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
              Enviar
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
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
