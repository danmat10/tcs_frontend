import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { PeopleAlt } from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import BarChartIcon from "@mui/icons-material/BarChart";

import { Header } from "components/Header";
import { ReactComponent as Logo } from "assets/icons/logo azul.svg";
import UserContext from "contexts/UserContext";
import { styles } from "components/Home";
import { URLS } from "routes";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Header />
      <Container
        sx={{
          margin: "auto",
          marginBottom: "20px",
        }}
      >
        <Grid
          container
          spacing={3}
          maxWidth="md"
          sx={{
            margin: "auto",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Logo
              style={{
                width: "220px",
                height: "220px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h2">Control</Typography>
              <Typography variant="h6">
                {user.nmUsuario} -{" "}
                {user.typeUser === "Admin" ? "Administrador" : user.typeUser}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          maxWidth="md"
          sx={{
            margin: "auto",
          }}
        >
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">Para onde vamos?</Typography>
          </Grid>
          <Grid item xs={4}>
            <Link to={URLS.USUARIO} style={{ textDecoration: "none" }}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <PeopleAlt className={styles.icon} />
                  <Typography variant="h6">Usuários</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link to={URLS.PATRIMONIO} style={{ textDecoration: "none" }}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <AccountBalanceIcon className={styles.icon} />
                  <Typography variant="h6">Patrimônio</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link to={URLS.DEPARTAMENTO} style={{ textDecoration: "none" }}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <BusinessCenterIcon className={styles.icon} />
                  <Typography variant="h6">Departamentos</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link tto={URLS.REQUISICAO} style={{ textDecoration: "none" }}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <AssignmentIcon className={styles.icon} />
                  <Typography variant="h6">Requisições</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link to={URLS.MANUTENCAO} style={{ textDecoration: "none" }}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <BuildIcon className={styles.icon} />
                  <Typography variant="h6">Manutenções</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link to={URLS.GESTAO} style={{ textDecoration: "none" }}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <BarChartIcon className={styles.icon} />
                  <Typography variant="h6">Gestão</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
