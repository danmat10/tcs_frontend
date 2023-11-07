import React from "react";
import { Button, Grid, Paper, Typography, Divider, Box } from "@mui/material";
import { styles } from ".";

const ManagementInventory = () => {
  return (
    <Paper
      elevation={3}
      style={{
        borderRadius: "28px",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
      fullWidth
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
          Inventários{" "}
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
          {/* Conteúdo */}
        </Grid>
      </Box>
      <Divider sx={{ marginBottom: 3 }} />
      <Box
        sx={{
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {}}
          sx={{
            marginRight: 3,
            marginBottom: 3,
          }}
        >
          GERAR
        </Button>
      </Box>
    </Paper>
  );
};
export { ManagementInventory };
