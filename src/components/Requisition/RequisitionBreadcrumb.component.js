import React from "react";
import { Breadcrumbs, Typography, Link } from "@mui/material";
import { LocalShipping, Home } from "@mui/icons-material";

import { URLS } from "config";

const RequisitionBreadcrumb = () => {
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
        <LocalShipping style={{ marginRight: "5px" }} />
        Requisições
      </Typography>
    </Breadcrumbs>
  );
};

export { RequisitionBreadcrumb };
