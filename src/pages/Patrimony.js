import { Dialog } from "@mui/material";
import { Breadcrumb, PageContainer } from "components/Common";
import { Header } from "components/Header";
import {
  PatrimonyBreadcrumb,
  PatrimonyCreate,
  PatrimonyList,
} from "components/Patrimony";
import { useState } from "react";

const Patrimony = () => {
  const [state, setState] = useState({
    view: "",
    selectedPatrimony: null,
    openDialog: false,
    users: [],
    patrimonies: [],
  });

  const openDialog = (view, selected = null) => {
    setState((prev) => ({
      ...prev,
      view,
      openDialog: true,
      selectedPatrimony: selected,
    }));
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, view: "", openDialog: false }));
  };

  const views = {
    list: (
      <PatrimonyList patrimonies={state.patrimonies} openDialog={openDialog} />
    ),
    create: <PatrimonyCreate onClose={closeDialog} setState={setState} />,
    update: null,
    view: null,
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Breadcrumb title="Patrimônio">
          <PatrimonyBreadcrumb />
        </Breadcrumb>
        {views.list}
      </PageContainer>
      <Dialog
        open={state.openDialog}
        onClose={closeDialog}
        PaperProps={{ sx: { borderRadius: "28px" } }}
      >
        {views[state.view]}
      </Dialog>
    </>
  );
};

export { Patrimony };
