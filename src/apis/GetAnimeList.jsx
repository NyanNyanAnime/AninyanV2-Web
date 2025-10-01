import Api from "./Api";

const GetAnimeList = async (page, orderby) => {
    try {
        const response = await Api.get(`/list?page=${page}&order_by=${orderby}`);
        return response.data ?? [];
    } catch (error) {
        console.error("Error fetching anime list:", error);
        throw error;
    }
};

export default GetAnimeList;
