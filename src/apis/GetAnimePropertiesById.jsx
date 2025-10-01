import Api from "./Api";

const GetAnimePropertiesById = async (type, id, page, orderBy) => {
    try {
        const response = await Api.get(`/properties/${type}/${id}?page=${page}&order_by=${orderBy}`);
        return response.data ?? [];
    } catch (error) {
        console.error("Error fetching anime properties:", error);
        throw error;
    }
};

export default GetAnimePropertiesById;
