import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Play } from 'lucide-react';
import Loading from '../components/LoadingCard';
import GetAnimeSchedule from '../apis/GetAnimeSchedule';
import AnimeCard from '../components/AnimeCard';
import { useSearchParams } from 'react-router-dom';

const AnimeSchedule = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [animeSchedule, setAnimeSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const initialDay = searchParams.get("schedule_day") || "monday";
    const [day, setDay] = useState(initialDay);

    useEffect(() => {
        setSearchParams({ schedule_day: day });
    }, [day, setSearchParams]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await GetAnimeSchedule(day);
                setAnimeSchedule(data);
            } catch (error) {
                console.error("Failed to fetch anime list:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [day]);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-20 max-w-7xl mx-auto px-4 md:px-6 py-6">
                <div className="mb-12 lg:mb-16">
                    <div className="mb-6 md:mb-16">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                            Schedule
                        </h2>

                        <div className="my-5">
                            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((dayName) => (
                                    <button
                                        key={dayName}
                                        onClick={() => setDay(dayName)}
                                        className={`group rounded-lg p-4 transition-all shadow-lg border 
                                        ${day === dayName
                                                ? "bg-[#0065F8] border-[#0065F8] text-white"
                                                : "bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-[#0065F8]"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3
                                                className={`font-medium text-sm line-clamp-2 pr-2 transition-colors 
                                                ${day === dayName ? "text-white" : "text-white group-hover:text-[#0065F8]"}`}
                                            >
                                                {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
                                            </h3>
                                            <span
                                                className={`p-2 rounded-full transition-all flex-shrink-0 
                                                ${day === dayName
                                                        ? "bg-white/20 text-white"
                                                        : "opacity-0 group-hover:opacity-100 bg-[#0065F8] hover:bg-[#4300FF] text-white"
                                                    }`}
                                            >
                                                <Play className="w-4 h-4" />
                                            </span>
                                        </div>
                                        <div
                                            className={`h-0.5 mt-3 transition-all duration-300 
                                            ${day === dayName ? "w-0" : "w-0 group-hover:w-full bg-[#0065F8]"}`}
                                        />
                                    </button>
                                ))}
                            </div>
                            <div className="w-full h-[1px] bg-gray-700 my-4"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, i) => <Loading key={i} />)
                        ) : animeSchedule?.scheduleAnime?.length > 0 ? (
                            animeSchedule.scheduleAnime.map((anime, index) => (
                                <AnimeCard key={anime.animeCode || index} anime={anime} index={index} />
                            ))
                        ) : (
                            <div className='col-span-6'>
                                <span className="flex justify-center text-3xl font-black text-white text-center uppercase tracking-wider">
                                    NO ANIME TODAY
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AnimeSchedule;
