import axios from "axios";

const BASE_URL = "https://sepong.aninyan.com/anime";

const Api = axios.create({
    baseURL: BASE_URL
});

export default Api;