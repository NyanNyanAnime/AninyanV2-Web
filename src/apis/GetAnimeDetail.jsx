import Api from "./Api";

const GetAnimeDetail = async (animeCode, animeId) => {
    try {
        const response = await Api.get(`/${animeCode}/${animeId}`);
        return response.data.animeDetails ?? [];
    } catch (error) {
        console.error("Error fetching anime detail:", error);
        throw error;
    }
};

export default GetAnimeDetail;
