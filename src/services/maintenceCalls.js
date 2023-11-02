import { handleApiCall } from ".";
import { ENDPOINTS, MESSAGES } from "config";

const handleCreateMaintence = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.MAINTENCE.POST,
      data: data,
      header: header,
    },
    MESSAGES.MAINTENCE.POST
  );
  handleGetMaintenceList({ header, setState });
};

const handleGetMaintenceList = async ({ header, setState }) => {
  let maintence = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.MAINTENCE.GET,
      header: header,
    },
    MESSAGES.MAINTENCE.GET
  );
  if (!maintence) maintence = [];
  setState((prev) => ({ ...prev, maintence }));
};

const handleEditMaintence = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "put",
      endpoint: ENDPOINTS.MAINTENCE.PUT_ID(data.id),
      data: data,
      header: header,
    },
    MESSAGES.MAINTENCE.PUT
  );
  handleGetMaintenceList({ header, setState });
};

const handleStartMaintence = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "put",
      endpoint: ENDPOINTS.MAINTENCE.START_ID(data.id),
      data: data,
      header: header,
    },
    MESSAGES.MAINTENCE.START
  );
  handleGetMaintenceList({ header, setState });
};

const handleEndMaintence = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "put",
      endpoint: ENDPOINTS.MAINTENCE.END_ID(data.id),
      data: data,
      header: header,
    },
    MESSAGES.MAINTENCE.END
  );
  handleGetMaintenceList({ header, setState });
};

const handleDeleteMaintence = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "put",
      endpoint: ENDPOINTS.MAINTENCE.DELETE_ID(data.id),
      data: data,
      header: header,
    },
    MESSAGES.MAINTENCE.DELETE
  );
  handleGetMaintenceList({ header, setState });
};

export {
  handleCreateMaintence,
  handleGetMaintenceList,
  handleEditMaintence,
  handleStartMaintence,
  handleEndMaintence,
  handleDeleteMaintence,
};
