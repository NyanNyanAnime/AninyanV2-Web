import axios from "axios";
import { BASE_URL } from "./url";

const AnimeSearch = async (animeSearch, page, orderBy) => {
    try {
        const response = await axios.get(`${BASE_URL}/search?query=${animeSearch}&order_by=${orderBy}&page=${page}`);
        return response.data ?? [];
    } catch (error) {
        console.error("Error fetching anime data:", error);
        throw error;
    }
};

export default AnimeSearch;
