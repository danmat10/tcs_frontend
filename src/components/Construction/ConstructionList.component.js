import React, { useState } from "react";
import { Grid, TextField, Button, FormHelperText } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ViewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { styles } from ".";
import PageGridContent from "components/Common/PageGridContent.component";

const ConstructionList = ({ openDialog }) => {
  const [search, setSearch] = useState("");

  return (
    <PageGridContent>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormHelperText>Pesquisar por nome, responsável...</FormHelperText>
      </Grid>
      <Grid item xs={12} md={9} className={styles.buttonGrid}>
        <Button
          variant="contained"
          onClick={() => openDialog("create")}
          className={styles.buttonCadastrar}
        >
          Cadastrar
        </Button>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid item xs={12} md={12} lg={12}></Grid>
      </Grid>
    </PageGridContent>
  );
};

export default ConstructionList;
