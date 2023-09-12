import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";

import { Breadcrumb, PageContainer } from "components/Common";
import { Header } from "components/Header";
import {
  MaintenceBreadcrumb,
  MaintenceEnd,
  MaintenceList,
  MaintenceStart,
  MaintenceView,
  MaintenceCreate,
  MaintenceEdit,
} from "components/Maintence";
import { handleGetMaintenceList, handleGetUsersList } from "services";

const Maintence = () => {
  const authHeader = useAuthHeader();

  useEffect(() => {
    handleGetUsersList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
    handleGetMaintenceList({
      header: { Authorization: authHeader() },
      setState: setState,
    });
  }, []);

  const [state, setState] = useState({
    view: "",
    selectedMaintence: null,
    openDialog: false,
    users: [],
    maintence: [],
  });

  const openDialog = (view, maintence = null) => {
    setState((prev) => ({
      ...prev,
      view,
      openDialog: true,
      selectedMaintence: maintence,
    }));
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, view: "", openDialog: false }));
  };

  const views = {
    list: <MaintenceList openDialog={openDialog} maintence={state.maintence} />,
    create: <MaintenceCreate onClose={closeDialog} setState={setState} />,
    update: (
      <MaintenceEdit
        onClose={closeDialog}
        setState={setState}
        maintence={state.selectedMaintence}
      />
    ),
    start: (
      <MaintenceStart
        onClose={closeDialog}
        setState={setState}
        maintence={state.selectedMaintence}
      />
    ),
    end: (
      <MaintenceEnd
        onClose={closeDialog}
        setState={setState}
        maintence={state.selectedMaintence}
      />
    ),
    view: (
      <MaintenceView
        onClose={closeDialog}
        maintence={state.selectedMaintence}
      />
    ),
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Breadcrumb title="Manutenções">
          <MaintenceBreadcrumb />
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

export { Maintence };
