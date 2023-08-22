import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { styles } from ".";

export default function DialogForm({
  title,
  children,
  onClose,
  onSubmit,
  btnSubmitName,
}) {
  return (
    <>
      <DialogTitle className={styles.dialogTitle} paragraph>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <Divider sx={{ marginTop: 5 }} />
      <DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" onClick={() => onSubmit()}>
            {btnSubmitName}
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
}
