import React from "react";
import { Typography, Breadcrumbs, Link } from "@mui/material";
import { AccountBalance, Home } from "@mui/icons-material";
import { URLS } from "config";

const PatrimonyBreadcrumb = () => {
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
        <AccountBalance style={{ marginRight: "5px" }} />
        Patrimônio
      </Typography>
    </Breadcrumbs>
  );
};

export { PatrimonyBreadcrumb };
