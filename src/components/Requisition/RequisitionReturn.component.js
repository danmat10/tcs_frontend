import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
} from "@mui/material";

import {
  formatBackendDateToField,
  formatFieldToDate,
  getToday,
  maskCurrencyFunction,
  styles,
} from "components/Common";
import { PatrimonyStatusChip } from "components/Patrimony";
import { ErrorOutline } from "@mui/icons-material";
import { useAuthHeader } from "react-auth-kit";
import { handleReturnRequest } from "services";

const RequisitionReturn = ({ requisition, onClose, setState }) => {
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const authHeader = useAuthHeader();

  const handleOpenDialog = (setOpenDialog) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (setOpenDialog) => {
    setOpenDialog(false);
  };

  const onReturnRequest = () => {
    const data = {
      dtRetirada: requisition.patrimonios[0].dtRetirada,
      dtPrevisaoRetirada: requisition.patrimonios[0].dtPrevisaoRetirada,
      dtDevolucao: formatFieldToDate(getToday()),
      patrimonios: requisition.patrimonios.map((item) => item.patrimonios),
      id: requisition.id,
      obra: requisition.obra,
    };
    handleReturnRequest({
      data,
      header: { Authorization: authHeader() },
      setState,
    });
    handleCloseDialog(setOpenApprovalDialog);
    setState((prev) => ({
      ...prev,
      view: "",
      openDialog: false,
      patrimonies: [],
    }));
  };

  return (
    <>
      <DialogTitle className={styles.dialogTitle} paragraph>
        Gerenciar Requisição
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center" marginTop="auto">
          <Grid item md={6} xs={12}>
            <TextField
              disabled
              fullWidth
              label="Obra de Destino"
              name="obra.nmObra"
              type="text"
              value={requisition.obra.nmObra || ""}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              disabled
              fullWidth
              label="Data de Previsão de Retirada"
              name="dtPrevisaoRetirada"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formatBackendDateToField(
                requisition.patrimonios[0]?.dtPrevisaoRetirada
              )}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              disabled
              fullWidth
              label="Data de Retirada"
              name="dtRetirada"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formatBackendDateToField(
                requisition.patrimonios[0]?.dtRetirada
              )}
              variant="standard"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              disabled
              fullWidth
              label="Data de Devolução"
              name="dtDevolucao"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formatBackendDateToField(
                requisition.patrimonios[0]?.dtDevolucao
              )}
              variant="standard"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center" marginTop="auto">
          <Grid item md={12} xs={12}>
            <Typography variant="subtitle1">Patrimônios</Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Valor de Aquisição</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requisition.patrimonios.map((patrimony) => (
                  <TableRow key={patrimony.id}>
                    <TableCell>{patrimony.patrimonios.id}</TableCell>
                    <TableCell>{patrimony.patrimonios.nmPatrimonio}</TableCell>
                    <TableCell>
                      {maskCurrencyFunction(patrimony.patrimonios.vlAquisicao)}
                    </TableCell>
                    <TableCell>
                      <PatrimonyStatusChip patrimony={patrimony.patrimonios} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider sx={{ marginTop: 3 }} />
      <DialogActions
        sx={{
          padding: 3,
        }}
      >
        <Button variant="outlined" color="error" onClick={() => onClose()}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={() => {
            handleOpenDialog(setOpenApprovalDialog);
          }}
        >
          Devolver
        </Button>
      </DialogActions>

      <Dialog
        open={openApprovalDialog}
        onClose={() => {
          handleCloseDialog(setOpenApprovalDialog);
        }}
      >
        <DialogTitle
          style={{
            backgroundColor: "#2E7D32",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          paragraph
        >
          <ErrorOutline style={{ marginRight: 8 }} />
          Devolver Requisição
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="subtitle1"
            component="p"
            style={{ marginTop: 16 }}
          >
            Você está prestes a devolver uma requisição. Você tem certeza que
            deseja devolver essa requisição?
          </Typography>
        </DialogContent>
        <Divider sx={{ marginTop: 3 }} />
        <DialogActions
          sx={{
            padding: "16px 24px",
          }}
        >
          <Button
            onClick={() => {
              handleCloseDialog(setOpenApprovalDialog);
            }}
            color="primary"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={onReturnRequest}
            color="success"
            variant="contained"
            style={{ marginRight: "15px" }}
          >
            Devolver
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { RequisitionReturn };
