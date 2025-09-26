import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Download, Server, List, Monitor } from "lucide-react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import VideoPlayer from '../components/VideoPlayer';
import GetAnimeDetail from '../apis/getAnimeDetail';
import GetAnimeEpisode from '../apis/GetAnimeEpisode';
import Loading from '../components/LoadingDetail';

const VideoAnime = () => {
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [episodeData, setEpisodeData] = useState(null);
    const [animeData, setAnimeData] = useState(null);
    const { animeCode, animeId, episodeId } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const server = searchParams.get("server") || "kuramadrive";
    const [selectedResolution, setSelectedResolution] = useState(null);

    useEffect(() => {
        if (episodeId) {
            setCurrentEpisode(Number(episodeId));
        }
    }, [episodeId]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await GetAnimeDetail(animeCode, animeId);
                const episode = await GetAnimeEpisode(animeCode, animeId, episodeId, server);
                setAnimeData(data);
                setEpisodeData(episode);

                if (episode?.videoUrl?.length) {
                    setSelectedResolution(episode.videoUrl[0]);
                }
            } catch (error) {
                console.error("Failed to fetch anime data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [animeCode, animeId, episodeId, server]);

    const handlePrev = () => {
        if (currentEpisode > 1) {
            const prevEpisode = currentEpisode - 1;
            setCurrentEpisode(prevEpisode);
            navigate(`/anime/${animeCode}/${animeId}/${prevEpisode}`);
        }
    };

    const handleNext = () => {
        if (animeData && currentEpisode < animeData.episodeList.length) {
            const nextEpisode = currentEpisode + 1;
            setCurrentEpisode(nextEpisode);
            navigate(`/anime/${animeCode}/${animeId}/${nextEpisode}`);
        }
    };

    const handleServerChange = (serverOption) => {
        setSearchParams({
            server: serverOption,
        });
    };

    const handleResolutionChange = (e) => {
        setSelectedResolution(e.target.value);
    };

    const extractResolution = (url) => {
        const match = url.match(/(\d{3,4}p)/);
        return match ? match[0] : "Unknown";
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="relative z-20 bg-black/90 backdrop-blur-sm border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link to="/">
                                <button
                                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-all"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                            </Link>
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold">
                                    {animeData.title}
                                </h1>
                                <p className="text-sm text-[#0065F8] font-medium">
                                    Episode {currentEpisode}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                        <VideoPlayer url={selectedResolution} />

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-900 rounded-lg p-4 lg:p-6">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentEpisode === 1}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded font-semibold transition-all ${currentEpisode === 1
                                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                        : "bg-gray-800 hover:bg-gray-700 text-white"
                                        }`}
                                >
                                    <ChevronLeft size={18} />
                                    <span className="hidden sm:inline">Previous</span>
                                </button>

                                <div className="flex items-center space-x-2 bg-[#0065F8] px-4 py-2 rounded font-bold">
                                    <span className="text-sm">EP</span>
                                    <span>{currentEpisode}</span>
                                </div>

                                <button
                                    onClick={handleNext}
                                    disabled={currentEpisode === animeData.episodeList.length}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded font-semibold transition-all ${currentEpisode === animeData.episodeList.length
                                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                        : "bg-gray-800 hover:bg-gray-700 text-white"
                                        }`}
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <ChevronRight size={18} />
                                </button>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 text-sm text-gray-400">
                                    <Server size={16} />
                                    <span>Server:</span>
                                </div>
                                <select
                                    value={server}
                                    onChange={(e) => handleServerChange(e.target.value)}
                                    className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-md 
                                                text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0065F8]"
                                >
                                    {["kuramadrive", "mega", "filemoon"].map((serverOption) => (
                                        <option key={serverOption} value={serverOption}>
                                            {serverOption.charAt(0).toUpperCase() + serverOption.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {episodeData?.videoUrl?.length > 0 && (
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <Monitor size={16} />
                                        <span>Resolution:</span>
                                    </div>
                                    <select
                                        value={selectedResolution || ""}
                                        onChange={handleResolutionChange}
                                        className="bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded-md 
                                   text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0065F8]"
                                    >
                                        {episodeData.videoUrl.map((url, index) => (
                                            <option key={index} value={url}>
                                                {extractResolution(url)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-900 rounded-lg p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                <img
                                    src={animeData.image}
                                    alt={animeData.title}
                                    className="w-full lg:w-48 h-64 lg:h-72 object-cover rounded-lg"
                                />
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                                            {episodeData.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm mb-4">
                                            {episodeData.date}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {animeData.genres?.map((genre) => (
                                            <span
                                                key={genre}
                                                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm font-medium text-gray-300"
                                            >
                                                {genre}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-gray-300 leading-relaxed">
                                        {animeData.synopsis}
                                    </p>

                                    <div className="flex items-center space-x-4 pt-4">
                                        <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded font-semibold transition-all">
                                            <Download size={18} />
                                            <span className="hidden sm:inline">Download</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Episode List Sidebar */}
                    <div className={`lg:col-span-1`}>
                        <div className="bg-gray-900 rounded-lg p-4 sticky top-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold flex items-center space-x-2">
                                    <List size={20} />
                                    <span>Episodes</span>
                                </h3>
                            </div>

                            <div className="space-y-2 max-h-96 lg:max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                                {animeData.episodeList?.map((episode, index) => {
                                    const isActive = Number(episodeId) === Number(episode.episodeId);
                                    const episodeNumber = index + 1;

                                    return (
                                        <Link
                                            key={episode.episodeId}
                                            to={`/anime/${animeCode}/${animeId}/${episode.episodeId}`}
                                            className='flex gap-2'>
                                            <button
                                                key={episode.episodeId}
                                                onClick={() => handleEpisodeClick(episode.episodeId)}
                                                className={`w-full text-left p-3 rounded-lg transition-all group ${isActive
                                                    ? 'bg-[#0065F8] text-white'
                                                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isActive
                                                        ? 'bg-white/20'
                                                        : 'bg-gray-700 group-hover:bg-gray-600'
                                                        }`}>
                                                        {episodeNumber}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`font-medium truncate ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                                                            }`}>
                                                            {episode.title}
                                                        </p>
                                                    </div>
                                                    {isActive && (
                                                        <Play size={16} fill="currentColor" />
                                                    )}
                                                </div>
                                            </button>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Controls */}
            {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-800 p-4">
                <div className="flex items-center justify-center space-x-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentEpisode === 1}
                        className={`p-3 rounded-full transition-all ${currentEpisode === 1
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 hover:bg-gray-700 text-white"
                            }`}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="bg-red-600 px-4 py-2 rounded-lg font-bold">
                        EP {currentEpisode}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentEpisode === animeData.episodeList.length}
                        className={`p-3 rounded-full transition-all ${currentEpisode === animeData.episodeList.length
                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                            : "bg-gray-800 hover:bg-gray-700 text-white"
                            }`}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div> */}

            <style jsx>{`
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #374151 #1f2937;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1f2937;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #374151;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #4b5563;
                }
            `}</style>
        </div>
    );
};

export default VideoAnime;
