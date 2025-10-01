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
        <Link
            to={anime.url}>
            <div className="group relative overflow-hidden bg-gray-900 rounded-xl shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-500">
                <div className="relative flex items-center gap-4 p-4">
                    <div className="relative w-36 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                        <img
                            src={anime.image}
                            alt={anime.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-blue-600/90 backdrop-blur-sm rounded-full p-2 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <PlayCircle className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md">
                            <span className="text-xs font-bold text-white">{Math.round(progressPercent)}%</span>
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                        <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                            {anime.title}
                        </h3>

                        <div className="flex items-center gap-2 text-gray-400">
                            <Clock className="w-4 h-4" />
                            <p className="text-sm font-medium">
                                <span>{formatTime(anime.progress)}</span>
                                <span className="mx-1">/</span>
                                <span>{formatTime(anime.duration)}</span>
                            </p>
                        </div>

                        <div className="space-y-1">
                            <div className="relative w-full h-2 bg-gray-700/50 rounded-full overflow-hidden shadow-inner">
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