import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormHelperText,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, ptBR } from "@mui/x-data-grid";

import { styles } from ".";
import { PageGridContent } from "components/Common";
import { Search } from "@mui/icons-material";

const PatrimonyList = ({ patrimonies, openDialog }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
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
      <Grid item xs={12} md={3}>
        <Button variant="contained" onClick={() => null}>
          <Search />
        </Button>
      </Grid>

      <Grid item xs={12} md={6} className={styles.buttonGrid}>
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

export { PatrimonyList };
