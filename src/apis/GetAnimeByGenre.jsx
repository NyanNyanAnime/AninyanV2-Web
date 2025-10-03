import Api from "./Api";

const GetAnimeByGenre = async () => {
    try {
        const [action, romance, comedy, kr, cn, jp] = await Promise.all([
            Api.get('/properties/genre/action?page=1&order_by=latest'),
            Api.get('/properties/genre/romance?page=1&order_by=latest'),
            Api.get('/properties/genre/comedy?page=1&order_by=latest'),
            Api.get('/properties/country/kr?page=1&order_by=latest'),
            Api.get('/properties/country/cn?page=1&order_by=latest'),
            Api.get('/properties/country/jp?page=1&order_by=latest'),
        ]);

        return {
            action: action.data.propertiesDetails ?? [],
            romance: romance.data.propertiesDetails ?? [],
            comedy: comedy.data.propertiesDetails ?? [],
            kr: kr.data.propertiesDetails ?? [],
            cn: cn.data.propertiesDetails ?? [],
            jp: jp.data.propertiesDetails ?? []
        };
    } catch (error) {
        console.error("Error fetching anime genre:", error);
        throw error;
    }
};

export default GetAnimeByGenre;
