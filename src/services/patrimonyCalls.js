import { toast } from "react-toastify";
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

const handleGetPatrimoniesSearchAllocation = async ({
  header,
  setState,
  state,
  params,
}) => {
  let results = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.PATRIMONY.SEARCH_ALLOCATION(params),
      header: header,
    },
    MESSAGES.EMPTY_MESSAGE
  );
  if (!results) {
    toast.warning("Nenhum patrimônio encontrado.");
    return;
  } else {
    toast.success(results.length + " patrimônio(s) localizado(s).");
  }
  let patrimonies = Array.from(state.patrimonies);
  results.forEach((result) => {
    if (!patrimonies.find((patrimony) => patrimony.id === result.id)) {
      patrimonies.push(result);
    }
  });

  setState((prev) => ({ ...prev, patrimonies: patrimonies }));
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
    MESSAGES.EMPTY_MESSAGE
  );
  if (!results) {
    toast.warning("Nenhum patrimônio encontrado.");
    return;
  } else {
    toast.success(results.length + " patrimônio(s) localizado(s).");
  }
  let patrimonies = Array.from(state.patrimonies);
  results.forEach((result) => {
    if (!patrimonies.find((patrimony) => patrimony.id === result.id)) {
      patrimonies.push(result);
    }
  });
  setState((prev) => ({ ...prev, patrimonies: patrimonies }));
};

const handleGetPatrimoniesSearchRequisition = async ({
  header,
  setState,
  state,
  params,
}) => {
  let results = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.PATRIMONY.SEARCH_REQUISITION(params),
      header: header,
    },
    MESSAGES.EMPTY_MESSAGE
  );
  if (!results) {
    toast.warning("Nenhum patrimônio encontrado.");
    return;
  } else {
    toast.success(results.length + " patrimônio(s) localizado(s).");
  }
  let patrimonies = Array.from(state.patrimonies);
  results.forEach((result) => {
    if (!patrimonies.find((patrimony) => patrimony.id === result.id)) {
      patrimonies.push(result);
    }
  });
  setState((prev) => ({ ...prev, patrimonies: patrimonies }));
};

const handleGetPatrimonyId = async ({
  header,
  state,
  setState,
  id,
  validatePatrimonyQrCode,
}) => {
  let result = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.PATRIMONY.GET_ID(id),
      header: header,
    },
    MESSAGES.EMPTY_MESSAGE
  );
  if (!result) {
    toast.warning("Nenhum patrimônio encontrado.");
    return;
  } else {
    const error = validatePatrimonyQrCode(result);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Patrimônio localizado.");
  }
  const results = [result];
  let patrimonies = Array.from(state.patrimonies);
  results.forEach((result) => {
    if (!patrimonies.find((patrimony) => patrimony.id === result.id)) {
      patrimonies.push(result);
    }
  });

  setState((prev) => ({ ...prev, patrimonies: patrimonies }));
};

const handleDropPatrimony = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.PATRIMONY.DROP,
      data: data,
      header: header,
    },
    MESSAGES.PATRIMONY.DROP
  );
  handleGetPatrimoniesList({ header, setState });
};

export {
  handleCreatePatrimony,
  handleEditPatrimony,
  handleGetPatrimoniesList,
  handleGetPatrimonyId,
  handleGetPatrimoniesSearch,
  handleGetPatrimoniesSearchAllocation,
  handleGetPatrimoniesSearchRequisition,
  handleDropPatrimony,
};
