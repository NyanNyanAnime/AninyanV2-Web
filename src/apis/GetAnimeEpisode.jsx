import axios from "axios";
import { BASE_URL } from "./url";

const GetAnimeEpisode = async (animeCode, animeId, episodeId, server) => {
    try {
        const response = await axios.get(`${BASE_URL}/${animeCode}/${animeId}/${episodeId}?server=${server}`);
        return response.data.data ?? [];
    } catch (error) {
        console.error("Error fetching anime Episode:", error);
        throw error;
    }
};

export default GetAnimeEpisode;
