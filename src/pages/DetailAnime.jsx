import { useEffect, useState } from "react";
import { Play, Plus, ThumbsUp, Info, Star, Calendar, Clock, Globe, Film, Users, Award, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import GetAnimeDetail from "../apis/getAnimeDetail";
import LoadingDetail from "../components/LoadingDetail";
import { Link, useParams } from "react-router-dom";

const DetailAnime = () => {
    const [activeTab, setActiveTab] = useState('episodes');
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const { animeCode, animeId } = useParams();
    const [animeData, setAnimeData] = useState(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await GetAnimeDetail(animeCode, animeId);
                setAnimeData(data);
            } catch (error) {
                console.error("Failed to fetch anime data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [animeCode, animeId]);

    if (loading) return <LoadingDetail />;

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={animeData.image}
                        alt={animeData.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                <div className="absolute top-0 left-0 right-0 z-20 p-4 lg:p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all backdrop-blur-sm"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <span className="text-xl lg:text-2xl font-bold">
                                ANI <span className="bg-white text-black">NYAN</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 lg:p-8">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                            {animeData.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm lg:text-base">
                            <div className="flex items-center space-x-1 ">
                                <Star size={16} fill="currentColor" className="text-yellow-400" />
                                <span className="font-semibold">{animeData.score}</span>
                            </div>
                            <span>{animeData.released}</span>
                            <span className="px-2 py-1 bg-gray-800 rounded text-xs font-medium">
                                {animeData.status}
                            </span>
                            <span>{animeData.episode} episodes</span>
                        </div>

                        <p className="text-sm lg:text-base text-gray-300 mb-6 max-w-xl hidden md:block">
                            {animeData.synopsis.substring(0, 200)}...
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <button
                                className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-all"
                            >
                                <Play size={20} fill="currentColor" />
                                <span>Watch Now</span>
                            </button>
                            {/* <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded font-semibold transition-all">
                                <Plus size={20} />
                                <span className="hidden sm:inline">My List</span>
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-8 py-6 lg:py-8">
                <div className="flex space-x-8 border-b border-gray-800 mb-8">
                    {['episodes', 'description'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-lg font-medium capitalize transition-all relative ${activeTab === tab
                                ? 'text-white'
                                : 'text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0065F8]"></div>
                            )}
                        </button>
                    ))}
                </div>

                {activeTab === 'episodes' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Episodes</h2>
                            <div className="text-sm text-gray-400">
                                {animeData.episodeList.length} Episodes
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {animeData.episodeList?.map((episode, index) => (
                                <Link
                                    key={episode.episodeId}
                                    to={`/anime/${animeCode}/${animeId}/${episode.episodeId}`}>
                                    <div
                                        key={episode.episodeId}
                                        className="group flex items-center bg-gray-900 hover:bg-gray-800 rounded-lg p-4 cursor-pointer transition-all"
                                    >
                                        <div className="relative w-32 h-18 bg-gray-800 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                                            <img
                                                src={animeData.image}
                                                alt={episode.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                                <Play size={16} fill="white" className="text-white opacity-80" />
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="font-semibold text-white group-hover:text-[#0065F8] transition-colors truncate pr-2">
                                                    {episode.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'description' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <div className="bg-gray-900 rounded-lg p-6">
                                    <p className="text-gray-300 leading-relaxed mb-4">
                                        <span className="font-semibold text-white">{animeData.title}</span>
                                        {animeData.alternativeTitles && (
                                            <span className="text-gray-400"> ({animeData.alternativeTitles})</span>
                                        )}
                                    </p>
                                    <p className="text-gray-300 leading-relaxed">
                                        {showMore ? animeData.synopsis : animeData.synopsis.substring(0, 300) + '...'}
                                    </p>
                                    <button
                                        onClick={() => setShowMore(!showMore)}
                                        className="flex items-center space-x-1 text-[#0065F8] hover:text-[#4300FF] mt-4 text-sm font-medium transition-colors"
                                    >
                                        <span>{showMore ? 'Show Less' : 'Show More'}</span>
                                        {showMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    <div className="my-10">
                                        <h3 className="text-xl font-semibold mb-4">Genres</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {animeData.genres?.map((genre) => (
                                                <span
                                                    key={genre}
                                                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm font-medium transition-colors cursor-pointer border border-gray-700 hover:border-gray-600"
                                                >
                                                    {genre}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {animeData.theme && animeData.theme.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-4">Themes</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {animeData.theme.map((theme) => (
                                                    <span
                                                        key={theme}
                                                        className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium text-gray-300 border border-gray-700"
                                                    >
                                                        {theme}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                                <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                                    <Info size={20} className="text-[#0065F8]" />
                                    <span>Information</span>
                                </h3>

                                <div className="space-y-4 text-sm">
                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400 flex items-center space-x-2">
                                            <Film size={16} />
                                            <span>Type</span>
                                        </span>
                                        <span className="text-white font-medium">{animeData.type}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400 flex items-center space-x-2">
                                            <Play size={16} />
                                            <span>Episodes</span>
                                        </span>
                                        <span className="text-white font-medium">{animeData.episode}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400">Status</span>
                                        <span className="text-white font-medium">{animeData.status}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400 flex items-center space-x-2">
                                            <Calendar size={16} />
                                            <span>Released</span>
                                        </span>
                                        <span className="text-white font-medium">{animeData.released}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400">Season</span>
                                        <span className="text-white font-medium">{animeData.season}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400 flex items-center space-x-2">
                                            <Clock size={16} />
                                            <span>Duration</span>
                                        </span>
                                        <span className="text-white font-medium">{animeData.duration}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400">Quality</span>
                                        <span className="text-white font-medium">{animeData.quality}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400 flex items-center space-x-2">
                                            <Globe size={16} />
                                            <span>Country</span>
                                        </span>
                                        <span className="text-white font-medium">{animeData.country}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400">Studio</span>
                                        <span className="text-white font-medium text-right">
                                            {animeData.studio.join(", ")}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400 flex items-center space-x-2">
                                            <Star size={16} />
                                            <span>Score</span>
                                        </span>
                                        <span className="text-white font-medium">{animeData.score}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                                        <span className="text-gray-400">Ratings</span>
                                        <span className="text-white font-medium">{animeData.ratings}</span>
                                    </div>

                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-gray-400 flex items-center space-x-2">
                                            <Users size={16} />
                                            <span>Enthusiast</span>
                                        </span>
                                        <span className="text-white font-medium">{animeData.enthusiast}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                                    <Award size={18} className="text-[#0065F8]" />
                                    <span>Credits</span>
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Creator</span>
                                        <span className="text-white font-medium">
                                            {animeData.credit?.join(", ") || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Adaptation</span>
                                        <span className="text-white font-medium">{animeData.adaptation}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailAnime;