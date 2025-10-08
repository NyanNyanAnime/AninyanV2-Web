import Api from "./Api";

const GetAllAnime = async () => {
    try {
        const [ongoing, finished, movie, season, slider] = await Promise.all([
            Api.get(`/ongoing`),
            Api.get(`/finished`),
            Api.get(`/movie`),
            Api.get(`/season`),
            Api.get(`/slider`),
        ]);

        return {
            ongoing: ongoing.data.ongoingAnime ?? [],
            finished: finished.data.finishedAnime ?? [],
            movie: movie.data.movieAnime ?? [],
            season: season.data.seasonAnime ?? [],
            slider: slider.data.sliderAnime ?? []
        };
    } catch (error) {
        console.error("Error fetching anime data:", error);
        throw error;
    }
};

export default GetAllAnime;
