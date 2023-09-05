import { handleApiCall } from ".";
import { ENDPOINTS, MESSAGES } from "config";

const handleCreateConstruction = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.CONSTRUCTION.POST,
      data: data,
      header: header,
    },
    MESSAGES.CONSTRUCTION.POST
  );
  handleGetConstructionList({ header, setState });
};

const handleGetConstructionList = async ({ header, setState }) => {
  let constructions = await handleApiCall(
    {
      method: "get",
      endpoint: ENDPOINTS.CONSTRUCTION.GET,
      header: header,
    },
    MESSAGES.CONSTRUCTION.GET
  );
  if (!constructions) constructions = [];
  setState((prev) => ({ ...prev, constructions }));
};

const handleEditConstruction = async ({ data, header, setState }) => {
  await handleApiCall(
    {
      method: "put",
      endpoint: ENDPOINTS.CONSTRUCTION.PUT_ID(data.id),
      data: data,
      header: header,
    },
    MESSAGES.CONSTRUCTION.PUT
  );
  handleGetConstructionList({ header, setState });
};

export {
  handleCreateConstruction,
  handleGetConstructionList,
  handleEditConstruction,
};
