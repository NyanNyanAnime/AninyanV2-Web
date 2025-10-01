import axios from "axios";

const BASE_URL = "https://sepong.aninyan.com/anime";
const API_KEY = "SecuredAnipyon1!"

const Api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "x-api-key": API_KEY
    }
});

export default Api;