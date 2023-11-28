import { Person } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, Link, Typography } from "@mui/material";
import { useFormik } from "formik";

import { FirstAccessFormFields } from "components/FirstAccess";
import { passwordValidation } from "validations";
import { handleFirstAccess } from "services";

const FirstAccessView = ({ state, setState }) => {
  const formik = useFormik({
    initialValues: {
      currentPassword: state.user.currentPassword || "",
      newPassword1: "",
      newPassword2: "",
    },
    validate: (values) => passwordValidation(values),
    validateOnChange: false,
    onSubmit: (values) => {
      handleFirstAccess({
        data: values,
        state: state,
      });
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
      <Typography variant="h6">Redefinir Senha</Typography>
      <Typography variant="body2" sx={{ opacity: "0.6" }}>
        Sua senha expirou, por favor, crie uma nova senha para continuar.
      </Typography>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar alt="Avatar" variant="circular">
          <Person />
        </Avatar>
        <Typography
          variant="body1"
          sx={{
            marginLeft: "10px",
          }}
        >
          {state.user.username || "Não informado"}
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <FirstAccessFormFields formik={formik} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Acessar
        </Button>
        <Grid container>
          <Grid item xs={6}>
            <Link
              href="#"
              variant="body2"
              onClick={() => {
                setState({
                  ...state,
                  view: "login",
                  user: {},
                });
              }}
            >
              Voltar ao login
            </Link>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export { FirstAccessView };
