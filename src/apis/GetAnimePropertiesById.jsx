import axios from "axios";
import { BASE_URL } from "./url";

const GetAnimePropertiesById = async (type, id, page, orderBy) => {
    try {
        const response = await axios.get(`${BASE_URL}/properties/${type}/${id}?page=${page}&order_by=${orderBy}`);
        return response.data ?? [];
    } catch (error) {
        console.error("Error fetching anime properties:", error);
        throw error;
    }
};

export default GetAnimePropertiesById;
