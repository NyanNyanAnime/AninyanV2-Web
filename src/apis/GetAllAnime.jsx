import axios from "axios";
import { BASE_URL } from "./url";

const GetAllAnime = async () => {
    try {
        const [ongoing, finished, movie, summer, slider] = await Promise.all([
            axios.get(`${BASE_URL}/ongoing`),
            axios.get(`${BASE_URL}/finished`),
            axios.get(`${BASE_URL}/movie`),
            axios.get(`${BASE_URL}/summer`),
            axios.get(`${BASE_URL}/slider`),
        ]);

        return {
            ongoing: ongoing.data.ongoingAnime ?? [],
            finished: finished.data.finishedAnime ?? [],
            movie: movie.data.movieAnime ?? [],
            summer: summer.data.summerAnime ?? [],
            slider: slider.data.sliderAnime ?? []
        };
    } catch (error) {
        console.error("Error fetching anime data:", error);
        throw error;
    }
};

export default GetAllAnime;
