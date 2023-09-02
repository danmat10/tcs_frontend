import { handleApiCall } from ".";
import { ENDPOINTS, MESSAGES } from "config";

const handleCreatePatrimony = async ({ data, header }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.PATRIMONY.POST,
      data: data,
      header: header,
    },
    MESSAGES.PATRIMONY.POST
  );
};

const handleEditPatrimony = async ({ data, header, setState, state }) => {
  const response = await handleApiCall(
    {
      method: "patch",
      endpoint: ENDPOINTS.PATRIMONY.PUT,
      data: data,
      header: header,
    },
    MESSAGES.PATRIMONY.PUT
  );
  if (response.ok) {
    const patrimonies = state.patrimonies.map((patrimony) => {
      if (patrimony.id === data.id) {
        return data;
      }
      return patrimony;
    });
    setState((prev) => ({ ...prev, patrimonies: patrimonies }));
  }
};

export { handleCreatePatrimony, handleEditPatrimony };
