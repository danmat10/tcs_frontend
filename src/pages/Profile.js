import React from "react";
import { Grid, Tabs, Tab } from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";

import { Header } from "components/Header";
import {
  ProfileBreadcrumb,
  ProfileTabAccount,
  ProfileTabSecurity,
} from "components/Profile";
import { styles } from "components/Profile";
import { Breadcrumb, PageContainer } from "components/Common";
import PageGridContent from "components/Common/PageGridContent.component";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Breadcrumb title="Perfil">
          <ProfileBreadcrumb />
        </Breadcrumb>
        <PageGridContent>
          {" "}
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
        </PageGridContent>
      </PageContainer>
    </>
  );
};

export default ProfilePage;
