import { Dialog } from "@mui/material";
import { Breadcrumb, PageContainer } from "components/Common";
import { Header } from "components/Header";
import {
  PatrimonyBreadcrumb,
  PatrimonyCreate,
  PatrimonyEdit,
  PatrimonyList,
  PatrimonyView,
} from "components/Patrimony";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { handleGetPatrimoniesList } from "services";

const Patrimony = () => {
  const authHeader = useAuthHeader();

  const [state, setState] = useState({
    view: "",
    selectedPatrimony: null,
    openDialog: false,
    users: [],
    patrimonies: [],
  });

  useEffect(() => {
    handleGetPatrimoniesList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
  }, []);

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
    update: (
      <PatrimonyEdit
        patrimony={state.selectedPatrimony}
        onClose={closeDialog}
        setState={setState}
      />
    ),
    view: (
      <PatrimonyView
        patrimony={state.selectedPatrimony}
        onClose={closeDialog}
      />
    ),
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
