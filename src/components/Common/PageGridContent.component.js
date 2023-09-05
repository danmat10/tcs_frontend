import { Grid } from "@mui/material";
import { styles } from ".";

const PageGridContent = ({ children }) => {
  return (
    <Grid container spacing={3} className={styles.pageGridContent}>
      {children}
    </Grid>
  );
};

export { PageGridContent };
