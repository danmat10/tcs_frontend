import React from "react";
import { Typography, Link, Breadcrumbs } from "@mui/material";
import { Build, Home } from "@mui/icons-material";

import { URLS } from "config";

const MaintenceBreadcrumb = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="inherit"
        href={URLS.HOME}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Home style={{ marginRight: "5px" }} />
        Home
      </Link>
      <Typography
        color="inherit"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Build style={{ marginRight: "5px" }} />
        Manutenções
      </Typography>
    </Breadcrumbs>
  );
};

export { MaintenceBreadcrumb };
