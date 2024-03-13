import { USER_REGISTRATION_ENDPOINT } from "@/apis/constants/userEndpoint";
import { FETCH } from "@/utils/api";

export const getRegistration = () => FETCH({ ENDPOINT: USER_REGISTRATION_ENDPOINT, METHOD: "GET" });
export const postRegistration = (data) =>
    FETCH({ ENDPOINT: USER_REGISTRATION_ENDPOINT, METHOD: "POST", data });
