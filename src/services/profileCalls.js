import axios from "axios";
import { MESSAGES } from "config";
import { ENDPOINTS } from "config";
import { toast } from "react-toastify";
import { apiCall } from "./apiUtils";

const handleEditContacts = async ({ data, header }) => {
    await apiCall(
        "patch",
        ENDPOINTS.USER.PATCH_ID(data.id),
        data,
        header,
        MESSAGES.USER.PROFILE.PATCH_CONTACTS
    );
};

const handleUploadPhoto = async ({ data, header, setPreviewSrc, setFile, setUser, id }) => {
    const formData = new FormData();
    formData.append("photo", data);
    await toast
        .promise(
            axios.post(ENDPOINTS.USER.PROFILE.POST_PHOTO(id), formData, {
                headers: header,
            }),
            MESSAGES.USER.PROFILE.POST_PHOTO
        )
        .then((response) => {
            setPreviewSrc(ENDPOINTS.USER.PROFILE.GET_PHOTO(response.data.photo));
            setFile(null);
            setUser((prevUser) => ({ ...prevUser, photo: response.data.photo }));
        })
        .catch((error) => {
            toast.error(error.message);
        });
};

export { handleEditContacts, handleUploadPhoto };