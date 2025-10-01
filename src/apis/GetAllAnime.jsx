import Api from "./Api";

const GetAllAnime = async () => {
    try {
        const [ongoing, finished, movie, summer, slider] = await Promise.all([
            Api.get(`/ongoing`),
            Api.get(`/finished`),
            Api.get(`/movie`),
            Api.get(`/summer`),
            Api.get(`/slider`),
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
