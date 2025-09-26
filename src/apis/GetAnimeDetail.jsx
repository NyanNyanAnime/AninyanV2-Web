import axios from "axios";
import { BASE_URL } from "./url";

const GetAnimeDetail = async (animeCode, animeId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${animeCode}/${animeId}`);
        return response.data.animeDetails ?? [];
    } catch (error) {
        console.error("Error fetching anime detail:", error);
        throw error;
    }
};

export default GetAnimeDetail;
