import Api from "./Api";

const GetAnimeProperties = async (type) => {
    try {
        const response = await Api.get(`/properties/${type}`);
        return response.data.propertiesAnime ?? [];
    } catch (error) {
        console.error("Error fetching anime properties:", error);
        throw error;
    }
};

export default GetAnimeProperties;
