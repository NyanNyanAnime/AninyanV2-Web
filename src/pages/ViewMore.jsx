import { useState, useEffect } from 'react';
import AnimeCard from '../components/AnimeCard';
import { useParams, useSearchParams } from "react-router-dom";
import GetAnimeByType from "../apis/GetAnimeByType";
import Loading from '../components/LoadingCard';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const ViewMore = () => {
    const { type } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialPage = parseInt(searchParams.get("page")) || 1;
    const initialOrder = searchParams.get("order_by") || "latest";

    const [page, setPage] = useState(initialPage);
    const [orderBy, setOrderBy] = useState(initialOrder);
    const [animeData, setAnimeData] = useState({ data: [], nextPage: false, prevPage: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setSearchParams({ page, order_by: orderBy });
    }, [page, orderBy, setSearchParams]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await GetAnimeByType(type, page, orderBy);
                setAnimeData(data);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (error) {
                console.error("Failed to fetch anime data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [type, page, orderBy]);

    const orderOptions = [
        { value: 'ascending', label: 'A-Z' },
        { value: 'descending', label: 'Z-A' },
        { value: 'oldest', label: 'Terlama' },
        { value: 'latest', label: 'Terbaru' },
        { value: 'popular', label: 'Teratas' },
        { value: 'most_viewed', label: 'Terpopuler' },
        { value: 'updated', label: 'Terupdate' }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="pt-20 container mx-auto px-4 md:px-6 lg:px-8">
                <div className="mb-12 lg:mb-16">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <div className="flex items-center space-x-3">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                Anime {type.charAt(0).toUpperCase() + type.slice(1)}
                            </h2>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-gray-300 uppercase tracking-wider text-sm">
                                Sort by
                            </span>
                            <select
                                value={orderBy}
                                onChange={(e) => setOrderBy(e.target.value)}
                                className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-md 
                                            text-sm uppercase tracking-wider font-medium 
                                            focus:outline-none focus:ring-2 focus:ring-[#0065F8] 
                                            hover:border-[#0065F8] transition"
                            >
                                {orderOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => <Loading key={i} />)
                            : animeData?.data?.map((anime, index) => (
                                <AnimeCard key={anime.animeCode || index} anime={anime} index={index} />
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center space-x-2 gap-4">
                    <button
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={!animeData.prevPage || loading}
                        className={`flex items-center space-x-2 px-4 py-2 rounded font-semibold transition-all
                            ${!animeData.prevPage || loading
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-800 hover:bg-gray-700 text-white'
                            }`}
                    >
                        Prev
                    </button>

                    <div className="flex items-center space-x-2 bg-[#0065F8] px-4 py-2 rounded font-bold">
                        <span className="text-sm">Page</span>
                        <span>{page}</span>
                    </div>

                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={!animeData.nextPage || loading}
                        className={`flex items-center space-x-2 px-4 py-2 rounded font-semibold transition-all
                            ${!animeData.nextPage || loading
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-gray-800 hover:bg-gray-700 text-white'
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ViewMore;
