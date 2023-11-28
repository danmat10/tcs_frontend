import { Dialog } from "@mui/material";
import { Breadcrumb, PageContainer } from "components/Common";
import { Header } from "components/Header";
import {
  PatrimonyBreadcrumb,
  PatrimonyCreate,
  PatrimonyDrop,
  PatrimonyEdit,
  PatrimonyList,
  PatrimonyView,
} from "components/Patrimony";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { handleCreateReport, handleGetPatrimoniesList } from "services";

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

  const openQrCode = (patrimony) => {
    const data = {
      type: "PDF",
      nmRelatory: "Gerar Qr Code Patrimônio",
      dtStart: "",
      dtEnd: "",
      fixo: true,
      vlMin: 0,
      vlMax: 0,
      nmPatrimony: patrimony.nmPatrimonio,
      nrSerie: patrimony.nrSerie,
    };
    handleCreateReport({
      data: data,
      header: { Authorization: authHeader() },
    });
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, view: "", openDialog: false }));
  };

  const views = {
    list: (
      <PatrimonyList
        patrimonies={state.patrimonies}
        openDialog={openDialog}
        openQrCode={openQrCode}
      />
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
    drop: (
      <PatrimonyDrop
        patrimony={state.selectedPatrimony}
        onClose={closeDialog}
        setState={setState}
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
        maxWidth="lg"
      >
        {views[state.view]}
      </Dialog>
    </>
  );
};

export { Patrimony };
