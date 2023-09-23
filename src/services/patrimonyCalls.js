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
      method: "put",
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

const handleGetPatrimoniesSearch = async ({
  header,
  setState,
  state,
  params,
}) => {
  let results = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.PATRIMONY.SEARCH(params),
      header: header,
    },
    MESSAGES.PATRIMONY.SEARCH
  );
  if (!results) return;
  let patrimonies = Array.from(state.patrimonies);
  results.forEach((result) => {
    if (!patrimonies.find((patrimony) => patrimony.id === result.id)) {
      patrimonies.push(result);
    }
  });

  setState((prev) => ({ ...prev, patrimonies: patrimonies }));
};

const handleGetPatrimonyId = async ({ header, state, setState, id }) => {
  let result = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.PATRIMONY.GET_ID(id),
      header: header,
    },
    MESSAGES.PATRIMONY.GET_ID
  );
  if (!result) return;
  const results = [result];
  let patrimonies = Array.from(state.patrimonies);
  results.forEach((result) => {
    if (!patrimonies.find((patrimony) => patrimony.id === result.id)) {
      patrimonies.push(result);
    }
  });

  setState((prev) => ({ ...prev, patrimonies: patrimonies }));
};

export {
  handleCreatePatrimony,
  handleEditPatrimony,
  handleGetPatrimoniesList,
  handleGetPatrimonyId,
  handleGetPatrimoniesSearch,
};
