import React from "react";
import { Button, TextField, Link, Grid, Box, Typography } from "@mui/material";

import { toast } from "react-toastify";

import { ReactComponent as Logo } from "assets/icons/logo.svg";

const ForgotPassword = () => {
  const onRequestPasswordReset = async (values) => {
    if (validateEmail(email) === false) {
      return;
    }
    toast.info("Em desenvolvimento");
  };
  const [email, setEmail] = React.useState("");
  const [formErrors, setFormErrors] = React.useState(false);

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    if (re.test(email) === false) {
      setFormErrors(true);
      return false;
    } else {
      setFormErrors(false);
      return re.test(email);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
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
            display: "flex",
            flexDirection: "column",
            width: "60%",
          }}
        >
          <Typography component="h1" variant="h5">
            Esqueceu sua senha?
          </Typography>
          <Typography variant="body2" sx={{ opacity: "0.6" }}>
            Digite o e-mail válido para alteração de senha
          </Typography>
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={formErrors}
            helperText={formErrors ? "Campo obrigatório" : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onRequestPasswordReset}
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
        </Box>
      </Grid>
    </Grid>
  );
};

export { ForgotPassword };
