import Api from "./Api";

const GetAnimeEpisode = async (animeCode, animeId, episodeId, server) => {
    try {
        const response = await Api.get(`/${animeCode}/${animeId}/${episodeId}?server=${server}`);
        return response.data.data ?? [];
    } catch (error) {
        console.error("Error fetching anime Episode:", error);
        throw error;
    }
};

export default GetAnimeEpisode;
