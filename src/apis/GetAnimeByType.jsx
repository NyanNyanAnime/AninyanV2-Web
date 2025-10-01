import Api from "./Api";

const GetAnimeByType = async (type, page, orderBy) => {
    try {
        const response = await Api.get(`/${type}?page=${page}&order_by=${orderBy}`);
        const data = response.data;

        // Ambil key pertama dari response (misal "ongoingAnime", "summerAnime", dll.)
        const firstKey = Object.keys(data).find(key => Array.isArray(data[key])) || "";
        const anime = firstKey ? data[firstKey] : [];

        return {
            data: anime,
            nextPage,
            prevPage,
        };
    } catch (error) {
        console.error(`Error fetching ${type} anime:`, error);
        throw error;
    }
};

export default GetAnimeByType;
