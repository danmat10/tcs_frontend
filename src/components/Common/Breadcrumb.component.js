import { Divider, Grid, Typography } from "@mui/material";
import {styles} from ".";

export default function Breadcrumb({ children, title }) {
  return (
    <Grid container spacing={3} paddingY={8}>
      <Grid item md={12} className={styles.gridBreadCrumb}>
        {children}
        <Typography variant="h4" marginTop={2}>
          {title}
        </Typography>
        <Divider />
      </Grid>
    </Grid>
  );
}
