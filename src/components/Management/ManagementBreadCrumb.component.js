import React from "react";
import { Typography, Link, Breadcrumbs } from "@mui/material";
import { BarChart, Home } from "@mui/icons-material";

import { URLS } from "config";

const ManagementBreadcrumb = () => {
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
        <BarChart style={{ marginRight: "5px" }} />
        Gestão
      </Typography>
    </Breadcrumbs>
  );
};

export { ManagementBreadcrumb };
