import { Container, Grid, Typography, Tabs, Tab } from "@mui/material";
import React from "react";

import { Header } from "../components/Header";
import {
  ProfileBreadcrumb,
  ProfileTabAccount,
  ProfileTabSecurity,
} from "../components/Profile";
import { styles } from "../components/Profile";
import { AccountCircle, Lock } from "@mui/icons-material";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Grid item lg={12} paddingY={5}>
          <ProfileBreadcrumb />
          <Typography variant="h4" marginTop={2}>
            Editar Perfil
          </Typography>
        </Grid>
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={3} className={styles.listGrid}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<AccountCircle />} label="Conta" iconPosition="start" />
            <Tab icon={<Lock />} label="Segurança" iconPosition="start" />
          </Tabs>
          <Grid item xs={12} md={12} lg={12}>
            {selectedTab === 0 && <ProfileTabAccount />}
            {selectedTab === 1 && <ProfileTabSecurity />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
