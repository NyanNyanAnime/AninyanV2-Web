import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SectionTitle from "../components/SectionTitle";
import AnimeCard from "../components/AnimeCard";
import AnimeCard2 from "../components/AnimeCard2";
import LoadingCard from "../components/LoadingCard";
import GetAllAnime from "../apis/GetAllAnime";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import GetAnimeByGenre from "../apis/GetAnimeByGenre";
import AnimeCardSlider from "../components/AnimeCardSlider";
import HistoryCard from "../components/HistoryCard";

const Home = () => {
    const [animeData, setAnimeData] = useState({
        ongoing: [],
        finished: [],
        movie: [],
        summer: [],
        slider: []
    });
    const [animeGenre, setAnimeGenre] = useState([]);
    const [animeCountry, setAnimeCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [activeGenre, setActiveGenre] = useState("action");
    const [activeCountry, setActiveCountry] = useState("CN");
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        const fetchData = async () => {
            try {
                const data = await GetAllAnime();
                setAnimeData(data);
            } catch (error) {
                console.error("Failed to fetch anime data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        fetchAnimeByGenre(activeGenre);
        fetchAnimeByCountry(activeCountry);
    }, []);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("animeHistory")) || [];
        setHistoryList(saved);
    }, []);

    const fetchAnimeByGenre = async (genre) => {
        setLoading2(true);
        try {
            const data = await GetAnimeByGenre("genre", genre);
            setAnimeGenre(data);
        } catch (error) {
            console.error("Failed to fetch anime by genre:", error);
            setAnimeGenre([]);
        } finally {
            setLoading2(false);
        }
    };

    const fetchAnimeByCountry = async (country) => {
        setLoading3(true);
        try {
            const data = await GetAnimeByGenre("country", country);
            setAnimeCountry(data);
        } catch (error) {
            console.error("Failed to fetch anime by country:", error);
            setAnimeCountry([]);
        } finally {
            setLoading3(false);
        }
    };

    const handleGenreClick = (genre) => {
        setActiveGenre(genre);
        fetchAnimeByGenre(genre);
    };

    const handleCountryClick = (country) => {
        setActiveCountry(country);
        fetchAnimeByCountry(country);
    };

    const skeletons = Array.from({ length: 6 });

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <Hero animeList={animeData.slider} />

            <div className="pt-20 container mx-auto px-4 md:px-6 lg:px-8">
                {!loading && historyList.length > 0 && (
                    <div className="mb-12 lg:mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">Last Watched</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {historyList.map((anime, index) => (
                                <HistoryCard key={index} anime={anime} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Summer */}
                <div className="mb-12 lg:mb-16">
                    <SectionTitle title="Summer Anime" subtitle="Summer Releases" type="summer" />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {loading
                            ? skeletons.map((_, i) => <LoadingCard key={i} />)
                            : animeData.summer.map((anime, index) => (
                                <AnimeCard key={anime.id} anime={anime} index={index} />
                            ))}
                    </div>
                    <div className="sm:hidden mt-4">
                        <Link
                            to={`/anime/summer?page=1&order_by=latest`}>
                            <button className="w-full bg-[#0065F8] hover:bg-[#4300FF] text-white py-3 rounded font-semibold transition-colors">
                                View All
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Ongoing */}
                <div className="mb-12 lg:mb-16">
                    <SectionTitle title="Ongoing Anime" subtitle="New Episodes Every Week" type="ongoing" />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {loading
                            ? skeletons.map((_, i) => <LoadingCard key={i} />)
                            : animeData.ongoing.map((anime, index) => (
                                <AnimeCard key={anime.id} anime={anime} index={index} />
                            ))}
                    </div>
                    <div className="sm:hidden mt-4">
                        <Link
                            to={`/anime/ongoing?page=1&order_by=latest`}>
                            <button className="w-full bg-[#0065F8] hover:bg-[#4300FF] text-white py-3 rounded font-semibold transition-colors">
                                View All
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Finished */}
                <div className="mb-12 lg:mb-16">
                    <SectionTitle title="Finished Anime" subtitle="Completed and Ready to Watch" type="finished" />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {loading
                            ? skeletons.map((_, i) => <LoadingCard key={i} />)
                            : animeData.finished.map((anime, index) => (
                                <AnimeCard key={anime.id} anime={anime} index={index} />
                            ))}
                    </div>
                    <div className="sm:hidden mt-4">
                        <Link
                            to={`/anime/finished?page=1&order_by=latest`}>
                            <button className="w-full bg-[#0065F8] hover:bg-[#4300FF] text-white py-3 rounded font-semibold transition-colors">
                                View All
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="mb-12 lg:mb-16">
                    {/* Genre Filter */}
                    <SectionTitle title="Anime By Genre" subtitle="Explore by Theme" type="ongoing" />

                    <div className="flex flex-wrap gap-3 mb-6">
                        {["action", "comedy", "romance"].map((genre) => (
                            <button
                                key={genre}
                                onClick={() => handleGenreClick(genre)}
                                className={`px-4 py-2 rounded-full text-base font-semibold transition-all transform ${activeGenre === genre
                                    ? "bg-[#0065F8] text-white shadow-lg scale-105"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
                                    }`}
                            >
                                {genre.charAt(0).toUpperCase() + genre.slice(1)}
                            </button>
                        ))}
                    </div>

                    {loading2 ? (
                        <div className="flex gap-4">
                            {skeletons.map((_, i) => (
                                <div key={i} className="w-[150px] sm:w-[180px] md:w-[200px]">
                                    <LoadingCard />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <AnimeCardSlider animeList={animeGenre} />
                    )}
                </div>

                <div className="mb-12 lg:mb-16">
                    <SectionTitle title="Anime By Country" subtitle="Anime from Around the World" type="ongoing" />

                    <div className="flex flex-wrap gap-3 mb-6">
                        {["CN", "KR", "JP"].map((country) => (
                            <button
                                key={country}
                                onClick={() => handleCountryClick(country)}
                                className={`px-4 py-2 rounded-full text-base font-semibold transition-all transform ${activeCountry === country
                                    ? "bg-[#0065F8] text-white shadow-lg scale-105"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
                                    }`}
                            >
                                {country.charAt(0).toUpperCase() + country.slice(1)}
                            </button>
                        ))}
                    </div>

                    {loading3 ? (
                        <div className="flex gap-4">
                            {skeletons.map((_, i) => (
                                <div key={i} className="w-[150px] sm:w-[180px] md:w-[200px]">
                                    <LoadingCard />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <AnimeCardSlider animeList={animeCountry} />
                    )}
                </div>

                {/* Movie */}
                <div className="mb-12 lg:mb-16">
                    <SectionTitle title="Anime Movies" subtitle="Anime Movies Collections" type="movie" />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                        {loading
                            ? skeletons.map((_, i) => <LoadingCard key={i} />)
                            : animeData.movie.map((anime, index) => (
                                <AnimeCard2 key={anime.id} anime={anime} index={index} />
                            ))}
                    </div>
                    <div className="sm:hidden mt-4">
                        <Link
                            to={`/anime/movie?page=1&order_by=latest`}>
                            <button className="w-full bg-[#0065F8] hover:bg-[#4300FF] text-white py-3 rounded font-semibold transition-colors">
                                View All
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
