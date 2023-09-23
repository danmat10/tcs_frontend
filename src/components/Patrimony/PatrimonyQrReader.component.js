import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { QrReader } from "react-qr-reader";
import { toast } from "react-toastify";

import { handleGetPatrimonyId } from "services";
import { styles } from "components/Patrimony";

const PatrimonyQrReader = ({
  state,
  setState,
  openQRScanner,
  setOpenQRScanner,
}) => {
  const [stateView, setStateView] = useState("reader");
  const authHeader = useAuthHeader();

  const getIdFromQrCode = (value) => {
    try {
      const id = parseInt(value);
      return id;
    } catch (err) {
      return null;
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleScan = async (data) => {
    if (data) {
      setStateView("loading");
      const id = getIdFromQrCode(data.text);
      if (!id) {
        toast.error("QR Code inválido");
        setOpenQRScanner(false);
        setStateView("reader");
        return;
      }
      await handleGetPatrimonyId({
        header: {
          Authorization: authHeader(),
        },
        state: state,
        setState: setState,
        id: id,
      });
      setOpenQRScanner(false);
      setStateView("reader");
    }
  };

  const view = {
    reader: (
      <QrReader
        delay={300}
        onError={handleError}
        onResult={handleScan}
        style={{ width: "100%" }}
      />
    ),
    loading: (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    ),
  };

  return (
    <Dialog
      fullScreen
      open={openQRScanner}
      onClose={() => setOpenQRScanner(false)}
    >
      <DialogTitle
        className={styles.dialogTitle}
        paragraph
        textAlign={"center"}
      >
        Ler QR Code
      </DialogTitle>
      <DialogContent>
        {view[stateView]}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => setOpenQRScanner(false)}
            color="primary"
            variant="contained"
          >
            Fechar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export { PatrimonyQrReader };