import { MESSAGES, ENDPOINTS } from "config";
import { handleApiCall } from ".";

const handleCreateUser = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.USER.POST,
      data: data,
      header: header,
    },
    MESSAGES.USER.POST
  );
  handleGetUsersList({ header, setState });
};

const handleEditUser = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "patch",
      endpoint: ENDPOINTS.USER.PATCH + data.id,
      data: data,
      header: header,
    },
    MESSAGES.USER.PATCH
  );
  handleGetUsersList({ header, setState });
};

const handleGetUsersList = async ({ header, setState }) => {
  let users = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.USER.GET,
      header: header,
    },
    MESSAGES.USER.GET
  );
  if (!users) users = [];
  setState((prev) => ({ ...prev, users }));
};

export { handleCreateUser, handleEditUser, handleGetUsersList };
