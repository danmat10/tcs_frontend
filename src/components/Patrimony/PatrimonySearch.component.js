import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { QrCode2 } from "@mui/icons-material";
import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";

import { handleGetPatrimoniesSearch } from "services";
import { PatrimonyQrReader } from "components/Patrimony";

const PatriomonySearch = ({ setState, state, setIsLoading }) => {
  const authHeader = useAuthHeader();
  const [nmPatrimonio, setNmPatrimonio] = useState("");
  const [fixo, setFixo] = useState("todos");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openQRScanner, setOpenQRScanner] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    await handleGetPatrimoniesSearch({
      header: { Authorization: authHeader() },
      setState,
      state,
      params: { nmPatrimonio: nmPatrimonio },
    });
    setIsLoading(false);
  };

  return (
    <>
      <Grid item md={12} xs={12}>
        <Typography variant="subtitle1">Pesquisar Patrimônios</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Pesquisar"
          value={nmPatrimonio}
          onChange={(e) => setNmPatrimonio(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="filter">Filtrar</InputLabel>
          <Select
            labelId="filter"
            label="Filtrar"
            value={fixo}
            onChange={(e) => setFixo(e.target.value)}
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="true">Alocáveis</MenuItem>
            <MenuItem value="false">Fixos</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Pesquisar
        </Button>
      </Grid>
      {isMobile && (
        <Grid item xs={12} md={3}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<QrCode2 />}
            fullWidth
            onClick={() => setOpenQRScanner(true)}
          >
            Ler Qr Code
          </Button>
        </Grid>
      )}
      <PatrimonyQrReader
        openQRScanner={openQRScanner}
        setOpenQRScanner={setOpenQRScanner}
        setState={setState}
        state={state}
      />
    </>
  );
};

export { PatriomonySearch };
