import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, Dialog } from "@mui/material";
import { styles } from ".";
import {
  InventoryCreate,
  InventoryEnd,
  InventoryList,
  InventoryView,
} from "components/Inventory";
import { handleGetInventoryList } from "services/inventoryCalls";
import { useAuthHeader } from "react-auth-kit";

const ManagementInventory = () => {
  const authHeader = useAuthHeader();

  const [state, setState] = useState({
    inventories: [],
    selectedInventory: {},
    openDialog: false,
    view: "",
  });

  useEffect(() => {
    handleGetInventoryList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
  }, []);

  const openDialog = (view, inventory = null) => {
    setState({
      ...state,
      view,
      selectedInventory: inventory,
      openDialog: true,
    });
  };

  const closeDialog = () => {
    setState({ ...state, view: "", openDialog: false });
  };

  const views = {
    list: (
      <InventoryList inventories={state.inventories} openDialog={openDialog} />
    ),
    create: <InventoryCreate onClose={closeDialog} setState={setState} />,
    view: (
      <InventoryView
        inventory={state.selectedInventory}
        onClose={closeDialog}
      />
    ),
    end: (
      <InventoryEnd
        onClose={closeDialog}
        setState={setState}
        selectedInventory={state.selectedInventory}
      />
    ),
  };

  return (
    <Paper
      elevation={3}
      style={{
        borderRadius: "28px",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "10%",
        }}
      >
        <Typography
          variant="h6"
          align="left"
          style={{ padding: "20px" }}
          className={styles.dialogTitle}
        >
          Inventários
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80%",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            padding: "30px",
          }}
        >
          {views.list}
        </Grid>
      </Box>
      <Dialog
        open={state.openDialog}
        onClose={closeDialog}
        PaperProps={{ sx: { borderRadius: "28px" } }}
      >
        {views[state.view]}
      </Dialog>
    </Paper>
  );
};
export { ManagementInventory };
