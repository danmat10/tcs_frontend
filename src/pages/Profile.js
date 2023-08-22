import React from "react";
import { Container, Grid, Tabs, Tab } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";

import { Header } from "components/Header";
import {
  ProfileBreadcrumb,
  ProfileTabAccount,
  ProfileTabSecurity,
} from "components/Profile";
import { styles } from "components/Profile";
import { Breadcrumb } from "components/Common";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          marginLeft: "20px",
          marginRight: "20px",
          marginBottom: "20px",
          width: "auto",
        }}
      >
        <Breadcrumb title="Perfil">
          <ProfileBreadcrumb />
        </Breadcrumb>
        <Grid container spacing={3} className={styles.gridContainer}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              icon={<AccountCircle />}
              label="Conta"
              iconPosition="start"
              className={styles.tabMenu}
            />
            <Tab
              icon={<Lock />}
              label="Segurança"
              iconPosition="start"
              className={styles.tabMenu}
            />
          </Tabs>
          <Grid item xs={12} md={12} lg={12} className={styles.listGrid}>
            {selectedTab === 0 && <ProfileTabAccount />}
            {selectedTab === 1 && <ProfileTabSecurity />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
