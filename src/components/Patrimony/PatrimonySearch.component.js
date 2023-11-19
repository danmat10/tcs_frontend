import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { QrCode2 } from "@mui/icons-material";
import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";

import { PatrimonyQrReader } from "components/Patrimony";

const PatriomonySearch = ({
  setState,
  state,
  setIsLoading,
  handleSearchPatrimonies,
  handleGetPatrimonyId,
}) => {
  const authHeader = useAuthHeader();
  const [nmPatrimonio, setNmPatrimonio] = useState("");
  const [error, setError] = useState(false);
  const helperText = "O campo é obrigatório";
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openQRScanner, setOpenQRScanner] = useState(false);

  const handleSearch = async () => {
    if (nmPatrimonio === "") {
      setError(true);
      return;
    } else {
      setError(false);
    }
    setIsLoading(true);
    await handleSearchPatrimonies({
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          error={error}
          helperText={error ? helperText : ""}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Button variant="contained" color="primary" onClick={handleSearch}>
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
        handleGetPatrimonyId={handleGetPatrimonyId}
      />
    </>
  );
};

export { PatriomonySearch };
