import { Inventory, QrCodeScanner, Summarize } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Dialog, Grid, Typography } from "@mui/material";

import { Breadcrumb, PageContainer } from "components/Common";
import { Header } from "components/Header";
import { ManagementBreadcrumb, styles } from "components/Management";
import { useState } from "react";

const Management = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState("");

    const [state, setState] = useState({
        view: "",
        openDialog: false,
        menu: {
            reports: {
                styles: styles.card,
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

        setState(prevState => ({
            ...prevState,
            menu: updatedMenuStyles,
        }));
    };



    const views = {
    };

    const closeDialog = () => {
    };

    return (
        <>
            <Header />
            <PageContainer>
                <Breadcrumb title="Gestão">
                    <ManagementBreadcrumb />
                </Breadcrumb>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
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
                </Grid>


                {views.list}
            </PageContainer>
            <Dialog
                open={state.openDialog}
                onClose={closeDialog}
                PaperProps={{ sx: { borderRadius: "28px" } }}
            >
                {views[state.view]}
            </Dialog>
        </>
    );
};

export { Management };
