import { Grid } from "@mui/material";
import { useState } from "react";

import { ReactComponent as Logo } from "assets/icons/logo.svg";
import { LoginView } from "components/Login";
import { FirstAccessView } from "components/FirstAccess";
import { useSignIn } from "react-auth-kit";

const Login = () => {
  const [state, setState] = useState({
    view: "login",
    user: {},
    signIn: useSignIn(),
  });

  const views = {
    login: <LoginView state={state} setState={setState} />,
    firstAccess: <FirstAccessView state={state} setState={setState} />,
  };

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
        {views[state.view]}
      </Grid>
    </Grid>
  );
};

export { Login };
