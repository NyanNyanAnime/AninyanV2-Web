import Api from "./Api";

const GetAnimeByGenre = async (type, genre) => {
    try {
        const response = await Api.get(`/properties/${type}/${genre}?page=1&order_by=latest`);
        return response.data.propertiesDetails ?? [];
    } catch (error) {
        console.error("Error fetching anime properties:", error);
        throw error;
    }
};

export default GetAnimeByGenre;
