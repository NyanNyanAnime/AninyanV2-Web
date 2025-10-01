
import { PlayCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const HistoryCard = ({ anime }) => {
    const progressPercent = (anime.progress / anime.duration) * 100;

    const formatTime = (time) => {
        if (!time) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <Link to={anime.url}>
            <div className="group relative overflow-hidden bg-gray-900 rounded-xl shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-500 active:scale-98">
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4">
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-36 md:w-40 h-32 sm:h-24 md:h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                        <img
                            src={anime.image}
                            alt={anime.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Play Button - lebih besar di mobile */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-blue-600/90 backdrop-blur-sm rounded-full p-2 sm:p-2 md:p-2.5 transform group-hover:scale-110 group-active:scale-95 transition-transform duration-300 shadow-lg">
                                <PlayCircle className="w-10 h-10 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" />
                            </div>
                        </div>

                        {/* Progress Badge */}
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2.5 py-1 sm:px-2 sm:py-1 rounded-md">
                            <span className="text-xs sm:text-xs font-bold text-white">
                                {Math.round(progressPercent)}%
                            </span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 w-full min-w-0 space-y-2 sm:space-y-2">
                        {/* Title */}
                        <h3 className="text-base sm:text-base md:text-lg font-bold text-white line-clamp-2 sm:line-clamp-1 group-hover:text-blue-400 transition-colors">
                            {anime.title}
                        </h3>

                        {/* Time Info */}
                        <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" />
                            <p className="text-sm sm:text-sm md:text-base font-medium">
                                <span className="text-white">{formatTime(anime.progress)}</span>
                                <span className="mx-1">/</span>
                                <span>{formatTime(anime.duration)}</span>
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                            <div className="relative w-full h-2 sm:h-2 md:h-2.5 bg-gray-700/50 rounded-full overflow-hidden shadow-inner">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

                                <div
                                    className="relative h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full shadow-lg transition-all duration-500"
                                    style={{ width: `${progressPercent}%` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 opacity-50 blur-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HistoryCard;