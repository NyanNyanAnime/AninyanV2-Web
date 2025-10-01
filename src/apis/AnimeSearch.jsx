import Api from "./Api";

const AnimeSearch = async (animeSearch, page, orderBy) => {
    try {
        const response = await Api.get(`/search?query=${animeSearch}&order_by=${orderBy}&page=${page}`);
        return response.data ?? [];
    } catch (error) {
        console.error("Error fetching anime data:", error);
        throw error;
    }
};

export default AnimeSearch;
