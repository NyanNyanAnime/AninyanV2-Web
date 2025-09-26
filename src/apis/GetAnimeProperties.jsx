import axios from "axios";
import { BASE_URL } from "./Url";

const GetAnimeProperties = async (type) => {
    try {
        const response = await axios.get(`${BASE_URL}/properties/${type}`);
        return response.data.propertiesAnime ?? [];
    } catch (error) {
        console.error("Error fetching anime properties:", error);
        throw error;
    }
};

export default GetAnimeProperties;
