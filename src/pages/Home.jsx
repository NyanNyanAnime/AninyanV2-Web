import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import SectionTitle from "../components/SectionTitle";
import AnimeCard from "../components/AnimeCard";
import LoadingCard from "../components/LoadingCard";
import GetAllAnime from "../apis/GetAllAnime";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
    const [animeData, setAnimeData] = useState({
        ongoing: [],
        finished: [],
        movie: [],
        summer: [],
        slider: []
    });
    const [loading, setLoading] = useState(true);

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
    }, []);

    const skeletons = Array.from({ length: 6 });

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <Hero animeList={animeData.slider.slice(0, 5)} />

            <div className="pt-20 container mx-auto px-4 md:px-6 lg:px-8">

                {/* Summer */}
                <div className="mb-12 lg:mb-16">
                    <SectionTitle title="Summer Anime" subtitle="Summer Anime" type="summer" />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {loading
                            ? skeletons.map((_, i) => <LoadingCard key={i} />)
                            : animeData.summer.map((anime, index) => (
                                <AnimeCard key={anime.id} anime={anime} index={index} />
                            ))}
                    </div>
                    <div className="sm:hidden mt-4">
                        <button className="w-full bg-[#0065F8] hover:bg-[#4300FF] text-white py-3 rounded font-semibold transition-colors">
                            View All
                        </button>
                    </div>
                </div>

                {/* Ongoing */}
                <div className="mb-12 lg:mb-16">
                    <SectionTitle title="Ongoing Anime" subtitle="Ongoing Anime" type="ongoing" />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {loading
                            ? skeletons.map((_, i) => <LoadingCard key={i} />)
                            : animeData.ongoing.map((anime, index) => (
                                <AnimeCard key={anime.id} anime={anime} index={index} />
                            ))}
                    </div>
                    <div className="sm:hidden mt-4">
                        <button className="w-full bg-[#0065F8] hover:bg-[#4300FF] text-white py-3 rounded font-semibold transition-colors">
                            View All
                        </button>
                    </div>
                </div>

                {/* Finished */}
                <div className="mb-12 lg:mb-16">
                    <SectionTitle title="Finished Anime" subtitle="Finished Anime" type="finished" />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {loading
                            ? skeletons.map((_, i) => <LoadingCard key={i} />)
                            : animeData.finished.map((anime, index) => (
                                <AnimeCard key={anime.id} anime={anime} index={index} />
                            ))}
                    </div>
                    <div className="sm:hidden mt-4">
                        <button className="w-full bg-[#0065F8] hover:bg-[#4300FF] text-white py-3 rounded font-semibold transition-colors">
                            View All
                        </button>
                    </div>
                </div>

                {/* Movie */}
                <div className="mb-12 lg:mb-16">
                    <SectionTitle title="Anime Movies" subtitle="Anime Movies" type="movie" />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {loading
                            ? skeletons.map((_, i) => <LoadingCard key={i} />)
                            : animeData.movie.map((anime, index) => (
                                <AnimeCard key={anime.id} anime={anime} index={index} />
                            ))}
                    </div>
                    <div className="sm:hidden mt-4">
                        <button className="w-full bg-[#0065F8] hover:bg-[#4300FF] text-white py-3 rounded font-semibold transition-colors">
                            View All
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
