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
import { toast } from "react-toastify";
import { useAuthHeader } from "react-auth-kit";
import { handleApproveRequest } from "services";

const RequisitionManagement = ({ requisition, onClose, setState }) => {
  const [openRejectionDialog, setOpenRejectionDialog] = useState(false);
  const [openApprovalDialog, setOpenApprovalDialog] = useState(false);
  const authHeader = useAuthHeader();

  const handleOpenDialog = (setOpenDialog) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (setOpenDialog) => {
    setOpenDialog(false);
  };

  const handleRejectRequest = () => {
    toast.warning("Não implementado");
  };

  const onApproveRequest = () => {
    const data = {
      dtRetirada: formatFieldToDate(getToday()),
      dtDevolucao: null,
      patrimonios: requisition.patrimonios.map((item) => item.patrimonios),
      id: requisition.id,
      obra: requisition.obra,
    };
    handleApproveRequest({
      data,
      header: { Authorization: authHeader() },
      setState,
    });
    handleCloseDialog(setOpenApprovalDialog);
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
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleOpenDialog(setOpenRejectionDialog);
          }}
        >
          Rejeitar
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={() => {
            handleOpenDialog(setOpenApprovalDialog);
          }}
        >
          Aprovar
        </Button>
      </DialogActions>

      <Dialog
        open={openRejectionDialog}
        onClose={() => {
          handleCloseDialog(setOpenRejectionDialog);
        }}
      >
        <DialogTitle
          style={{
            backgroundColor: "#C62828",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          paragraph
        >
          <ErrorOutline style={{ marginRight: 8 }} />
          Rejeitar Requisição
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="subtitle1"
            component="p"
            style={{ marginTop: 16 }}
          >
            Você está prestes a rejeitar uma requisição. Você tem certeza que
            deseja rejeitar essa requisição?
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
              handleCloseDialog(setOpenRejectionDialog);
            }}
            color="primary"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleRejectRequest}
            color="error"
            variant="contained"
            style={{ marginRight: "15px" }}
          >
            Rejeitar
          </Button>
        </DialogActions>
      </Dialog>
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
          Aprovar Requisição
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="subtitle1"
            component="p"
            style={{ marginTop: 16 }}
          >
            Você está prestes a aprovar uma requisição. Você tem certeza que
            deseja aprovar essa requisição?
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
            onClick={onApproveRequest}
            color="success"
            variant="contained"
            style={{ marginRight: "15px" }}
          >
            Aprovar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { RequisitionManagement };
