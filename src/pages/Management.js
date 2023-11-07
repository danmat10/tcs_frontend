import { Inventory, QrCodeScanner, Summarize } from "@mui/icons-material";
import {
  Button,
  Grid,
  Typography,
} from "@mui/material";

import { Breadcrumb, PageContainer } from "components/Common";
import { Header } from "components/Header";
import {
  ManagementBreadcrumb,
  ManagementInventory,
  ManagementReports,
  ManagementTraceability,
  styles,
} from "components/Management";
import { useState } from "react";

const Management = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("reports");

  const [state, setState] = useState({
    openDialog: false,
    menu: {
      reports: {
        styles: styles.cardSelected,
      },
      inventory: {
        styles: styles.card,
      },
      qrCodeScanner: {
        styles: styles.card,
      },
    },
  });

  const openMenu = (menu) => {
    setSelectedMenuItem(menu);

    const updatedMenuStyles = Object.keys(state.menu).reduce((acc, key) => {
      acc[key] = {
        ...state.menu[key],
        styles: menu === key ? styles.cardSelected : styles.card,
      };
      return acc;
    }, {});

    setState((prevState) => ({
      ...prevState,
      menu: updatedMenuStyles,
    }));
  };

  const views = {
    reports: <ManagementReports />,
    inventory: <ManagementInventory />,
    qrCodeScanner: <ManagementTraceability />,
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Breadcrumb title="Gestão">
          <ManagementBreadcrumb />
        </Breadcrumb>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Button
                  variant="contained"
                  className={state.menu.reports.styles}
                  onClick={() => openMenu("reports")}
                  startIcon={<Summarize className={styles.icon} />}
                >
                  <Typography variant="h6" className={styles.cardTitle}>
                    Gerar Relatórios
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Button
                  variant="contained"
                  className={state.menu.inventory.styles}
                  onClick={() => openMenu("inventory")}
                  startIcon={<Inventory className={styles.icon} />}
                >
                  <Typography variant="h6" className={styles.cardTitle}>
                    Inventários
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Button
                  variant="contained"
                  className={state.menu.qrCodeScanner.styles}
                  onClick={() => openMenu("qrCodeScanner")}
                  startIcon={<QrCodeScanner className={styles.icon} />}
                >
                  <Typography variant="h6" className={styles.cardTitle}>
                    Rastreabilidade Patrimonial
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
            {views[selectedMenuItem]}
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export { Management };
