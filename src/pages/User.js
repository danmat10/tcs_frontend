import React, { useState, useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import Dialog from "@mui/material/Dialog";

import {
  UserList,
  UserEdit,
  UserView,
  UserCreate,
  UserBreadcrumb,
} from "components/User";
import { Header } from "components/Header";
import { PageContainer, Breadcrumb } from "components/Common";
import { handleGetUsersList } from "services";

const User = () => {
  const authHeader = useAuthHeader();
  useEffect(
    () =>
      handleGetUsersList({
        header: { Authorization: authHeader() },
        setState: setState,
      }),
    []
  );

  const [state, setState] = useState({
    view: "",
    selectedUser: null,
    openDialog: false,
    users: [],
  });

  const openDialog = (view, user = null) => {
    setState((prev) => ({
      ...prev,
      view,
      openDialog: true,
      selectedUser: user,
    }));
  };

  const closeDialog = () => {
    setState((prev) => ({ ...prev, view: "", openDialog: false }));
  };

  const views = {
    list: <UserList users={state.users} openDialog={openDialog} />,
    create: <UserCreate onClose={closeDialog} setState={setState} />,
    update: (
      <UserEdit
        user={state.selectedUser}
        onClose={closeDialog}
        setState={setState}
      />
    ),
    view: <UserView user={state.selectedUser} onClose={closeDialog} />,
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Breadcrumb title="Usuários">
          <UserBreadcrumb />
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

export { User };
