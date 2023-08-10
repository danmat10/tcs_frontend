import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import {Header} from "../components/Header";

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ padding: "2rem" }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: "2rem" }}>
                <Typography variant="h4" gutterBottom>
                  Olá, seja bem-vindo!
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Bem-vindo à nossa incrível página inicial! Aqui você
                  encontrará informações, recursos e muito mais.
                </Typography>
                <Button variant="contained" color="primary" href="#">
                  Explore agora
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
