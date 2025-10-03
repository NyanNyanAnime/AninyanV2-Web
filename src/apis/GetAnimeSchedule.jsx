import Api from "./Api";

const GetAnimeSchedule = async (day) => {
    try {
        const response = await Api.get(`/schedule?scheduled_day=${day}`);
        return response.data ?? [];
    } catch (error) {
        console.error("Error fetching anime schedule:", error);
        throw error;
    }
};

export default GetAnimeSchedule;
