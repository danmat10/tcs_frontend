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

const handleGetPatrimoniesParams = async ({ header, setOptions, params }) => {
  let results = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.PATRIMONY.GET_PARAMS(params),
      header: header,
    },
    MESSAGES.PATRIMONY.GET
  );
  if (!results) results = [];
  setOptions(results);
};

const handleGetPatrimonyId = async ({ header, setOptions, id }) => {
  let result = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.PATRIMONY.GET_ID(id),
      header: header,
    },
    MESSAGES.PATRIMONY.GET
  );
  let results = [];
  if (result) results = [result];
  setOptions(results);
};

export {
  handleCreatePatrimony,
  handleEditPatrimony,
  handleGetPatrimoniesList,
  handleGetPatrimoniesParams,
  handleGetPatrimonyId,
};
