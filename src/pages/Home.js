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
import {
  AccountBalance,
  Assignment,
  Construction,
  Build,
  BusinessCenter,
  PeopleAlt,
} from "@mui/icons-material";

import { ReactComponent as Logo } from "assets/icons/logo azul.svg";
import { Header } from "components/Header";
import { styles } from "components/Home";
import { URLS } from "config";
import UserContext from "contexts/UserContext";
import { useIsAdmin } from "routes/useIsAdmin";
import { useIsGestor } from "routes";

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
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              textAlign: { xs: "center", sm: "left" },
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
              <Typography variant="h2" className={styles.h2}>
                Control
              </Typography>
              <Typography variant="h6" className={styles.h6}>
                {user.nmUsuario} -{" "}
                {user.typeUser === "Admin" ? "Administrador" : user.typeUser}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container maxWidth="1000px" margin="auto" alignItems="center">
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4" className={styles.h4}>
              Para onde vamos?
            </Typography>
          </Grid>
          {useIsAdmin() && (
            <Grid item xs={12} md={4} className={styles.gridCard}>
              <Link to={URLS.USUARIO} style={{ textDecoration: "none" }}>
                <Card className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    <PeopleAlt className={styles.icon} />
                    <Typography variant="h6" className={styles.cardTitle}>
                      Usuários
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          )}
          {useIsGestor() && (
            <Grid item xs={12} md={4} className={styles.gridCard}>
              <Link to={URLS.DEPARTAMENTO} style={{ textDecoration: "none" }}>
                <Card className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    <BusinessCenter className={styles.icon} />
                    <Typography variant="h6" className={styles.cardTitle}>
                      Departamentos
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          )}
          {useIsGestor() && (
            <Grid item xs={12} md={4} className={styles.gridCard}>
              <Link to={URLS.OBRA} style={{ textDecoration: "none" }}>
                <Card className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    <Construction className={styles.icon} />
                    <Typography variant="h6" className={styles.cardTitle}>
                      Obras
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          )}
          {useIsGestor() && (
            <Grid item xs={12} md={4} className={styles.gridCard}>
              <Link to={URLS.PATRIMONIO} style={{ textDecoration: "none" }}>
                <Card className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    <AccountBalance className={styles.icon} />
                    <Typography variant="h6" className={styles.cardTitle}>
                      Patrimônio
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          )}
          <Grid item xs={12} md={4} className={styles.gridCard}>
            <Link tto={URLS.REQUISICAO} style={{ textDecoration: "none" }}>
              <Card className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <Assignment className={styles.icon} />
                  <Typography variant="h6" className={styles.cardTitle}>
                    Requisições
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          {useIsGestor() && (
            <Grid item xs={12} md={4} className={styles.gridCard}>
              <Link to={URLS.MANUTENCAO} style={{ textDecoration: "none" }}>
                <Card className={styles.card}>
                  <CardContent className={styles.cardContent}>
                    <Build className={styles.icon} />
                    <Typography variant="h6" className={styles.cardTitle}>
                      Manutenções
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export { Home };
