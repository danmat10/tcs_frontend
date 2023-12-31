import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";

import { styles } from ".";

const DialogForm = ({
  title,
  children,
  onClose,
  onSubmit = null,
  btnSubmitName,
}) => {
  return (
    <>
      <DialogTitle className={styles.dialogTitle} paragraph>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <Divider sx={{ marginTop: 3 }} />
      <DialogActions
        sx={{
          padding: 3,
        }}
      >
        {(onSubmit && (
          <>
            <Button variant="outlined" color="error" onClick={() => onClose()}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => onSubmit()}
            >
              {btnSubmitName}
            </Button>
          </>
        )) || (
          <Button type="submit" variant="contained" onClick={() => onClose()}>
            OK
          </Button>
        )}
      </DialogActions>
    </>
  );
};

export { DialogForm };
