import { handleApiCall } from ".";
import { ENDPOINTS, MESSAGES } from "config";

const handleCreatePatrimony = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.PATRIMONY.POST,
      data: data,
      header: header,
    },
    MESSAGES.PATRIMONY.POST
  );
  handleGetPatrimoniesList({ header, setState });
};

const handleEditPatrimony = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "patch",
      endpoint: ENDPOINTS.PATRIMONY.PUT_ID(data.id),
      data: data,
      header: header,
    },
    MESSAGES.PATRIMONY.PUT
  );
  handleGetPatrimoniesList({ header, setState });
};

const handleGetPatrimoniesList = async ({ header, setState }) => {
  let patrimonies = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.PATRIMONY.GET,
      header: header,
    },
    MESSAGES.PATRIMONY.GET
  );
  if (!patrimonies) patrimonies = [];
  setState((prev) => ({ ...prev, patrimonies }));
};

export { handleCreatePatrimony, handleEditPatrimony, handleGetPatrimoniesList };
